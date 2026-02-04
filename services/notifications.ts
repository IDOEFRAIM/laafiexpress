import { db } from "@/db";
import { profiles, shipments, payments } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { TransportType, ShipmentStatus } from "@/types/logistics";

/**
 * SERVICE: NOTIFICATIONS LAAFI EXPRESS
 * Gestion des alertes SMS/WhatsApp selon le flux logistique 2026
 */
export const notificationService = {
  /**
   * Envoi d'une alerte individuelle (ex: Colis reçu en Chine)
   */
  async sendIndividualUpdate(shipmentId: string, status: ShipmentStatus) {
    const data = await db.query.shipments.findFirst({
      where: eq(shipments.id, shipmentId),
      with: { 
        client: true 
      }
    });

    if (!data || !data.client || !data.client.phone) {
      console.warn(`Notification impossible: Client ou téléphone manquant pour le colis ${shipmentId}`);
      return;
    }

    const message = `LAAFI EXPRESS: Votre colis ${data.trackingNumber} est désormais : ${status}.`;
    
    return await this._triggerSMS(data.client.phone, message);
  },

  /**
   * Confirmation de paiement (Reçu digital)
   */
  async sendPaymentReceipt(paymentId: string) {
    const data = await db.query.payments.findFirst({
      where: eq(payments.id, paymentId),
      with: {
        invoice: {
          with: {
            client: true
          }
        }
      }
    });

    if (!data || !data.invoice?.client?.phone) return;

    const message = `LAAFI EXPRESS: Reçu de paiement: ${data.amount.toLocaleString()} CFA encaissé via ${data.method}. Merci pour votre confiance.`;
    return await this._triggerSMS(data.invoice.client.phone, message);
  },

  /**
   * Envoi groupé selon le calendrier contractuel
   * @param type 'AERIEN' ou 'MARITIME'
   */
  async sendBulkUpdate(type: TransportType) {
    const today = new Date().getDay(); // 0=Dimanche, 2=Mardi, 5=Vendredi, 6=Samedi

    // 1. Logique de calendrier (Strict 2026)
    const isAllowedDay = (type === "AERIEN" && [2, 5].includes(today)) || 
                         (type === "MARITIME" && today === 6);

    if (!isAllowedDay) {
      const schedule = type === "AERIEN" ? "Mardi et Vendredi" : "Samedi";
      console.log(`Update ${type} ignoré: Autorisé seulement le ${schedule}.`);
      return { success: false, reason: "Hors calendrier" };
    }

    // 2. Récupération des colis avec jointure client
    const activeShipments = await db.query.shipments.findMany({
      where: and(
        eq(shipments.type, type),
        inArray(shipments.status, ["EN_COURS_GROUPAGE", "CHARGE_TRANSIT", "ARRIVE_OUAGA"])
      ),
      with: { client: true }
    });

    if (activeShipments.length === 0) return { success: true, count: 0 };

    // 3. Envoi des notifications
    // Note: On filtre les clients sans téléphone pour éviter les erreurs
    const notifications = activeShipments
      .filter(s => s.client?.phone)
      .map(s => {
        const msg = `LAAFI EXPRESS [Update ${type}]: Votre colis ${s.trackingNumber} est en statut: ${s.status}.`;
        return this._triggerSMS(s.client!.phone!, msg);
      });

    const results = await Promise.all(notifications);
    return { success: true, count: results.length };
  },

  /**
   * Rappel de paiement (Règles 3.7 & 4.7)
   */
  async sendPaymentReminder(phone: string, daysRemaining: number, amount: number) {
    if (!phone) return;
    const message = `LAAFI EXPRESS: Rappel. Il reste ${daysRemaining} jours pour régler ${amount.toLocaleString()} CFA avant l'expédition.`;
    return await this._triggerSMS(phone, message);
  },

  /**
   * Méthode privée (Intégration API)
   */
  async _triggerSMS(phone: string, message: string) {
    // Nettoyage du numéro (ex: enlever les espaces ou ajouter +226)
    const cleanPhone = phone.replace(/\s/g, '');
    
    console.log(`[SMS Gateway] Vers ${cleanPhone}: ${message}`);
    
    // Ici tu brancheras ton fetch() vers ton provider (ex: Hubert, InTouch, etc.)
    return { success: true };
  }
};