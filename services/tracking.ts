import { db } from "@/db";
import { shipments, containers } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { ShipmentStatus, TransportType } from "@/types/logistics";

/**
 * SERVICE: TRACKING LAAFI EXPRESS
 * Gère les flux de marchandises Chine -> Burkina
 */
export const trackingService = {
  /**
   * Définit l'ordre logique des étapes pour éviter les erreurs de saisie
   */
  statusOrder: [
    "RECU_CHINE",
    "EN_COURS_GROUPAGE",
    "CHARGE_TRANSIT",
    "ARRIVE_OUAGA",
    "LIVRE"
  ] as ShipmentStatus[],

  /**
   * Règle 3.3 & 4.2 : Mise à jour du statut d'un colis avec validation
   */
  async updateShipmentStatus(shipmentId: string, newStatus: ShipmentStatus) {
    const currentShipment = await db.query.shipments.findFirst({
      where: eq(shipments.id, shipmentId),
    });

    if (!currentShipment) throw new Error("Colis introuvable");

    // Sécurité : Empêcher de revenir en arrière ou de sauter des étapes cruciales
    // sauf cas de "LITIGE_BLOQUE"
    if (newStatus !== "LITIGE_BLOQUE") {
       const currentIndex = this.statusOrder.indexOf(currentShipment.status as ShipmentStatus);
       const nextIndex = this.statusOrder.indexOf(newStatus);
       
       if (nextIndex < currentIndex) {
         throw new Error("Impossible de revenir à un statut antérieur.");
       }
    }

    return await db.update(shipments)
      .set({ 
        status: newStatus,
        updatedAt: new Date() 
      })
      .where(eq(shipments.id, shipmentId))
      .returning();
  },

  /**
   * Règle 3.4 : Mise à jour de masse (Groupage)
   * Quand un conteneur est chargé, tous les colis qu'il contient changent de statut
   */
  async updateContainerTracking(containerId: string, status: ShipmentStatus) {
    return await db.transaction(async (tx) => {
      // 1. Mettre à jour le statut du conteneur lui-même
      await tx.update(containers)
        .set({ status: status === "CHARGE_TRANSIT" ? "EN_MER" : "ARRIVE" })
        .where(eq(containers.id, containerId));

      // 2. Mettre à jour tous les colis liés (Règle de transparence 5)
      return await tx.update(shipments)
        .set({ status: status })
        .where(eq(shipments.containerId, containerId))
        .returning();
    });
  },

  /**
   * Règle 3.4 : Calculateur de délai estimé
   */
  getEstimatedArrival(loadingDate: Date, type: TransportType): Date {
    const arrivalDate = new Date(loadingDate);
    if (type === "MARITIME") {
      arrivalDate.setMonth(arrivalDate.getMonth() + 2); // 2 mois de mer
    } else {
      arrivalDate.setDate(arrivalDate.getDate() + 14); // 14 jours max aérien
    }
    return arrivalDate;
  }
};