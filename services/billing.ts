import { db } from "@/db"
import { invoices, payments, shipments } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { notificationService } from "./notifications"

export const BillingService = {
  /**
   * Récupère toutes les factures avec les détails du colis et du client
   */
  async getAllInvoices() {
    return await db.query.invoices.findMany({
      with: {
        client: true,
        shipment: true,
        payments: true,
      },
      orderBy: (i, { desc }) => [desc(i.createdAt)],
    })
  },

  /**
   * Récupère les factures par client
   */
  async getInvoicesByClient(clientId: string) {
    return await db.query.invoices.findMany({
      where: eq(invoices.clientId, clientId),
      with: {
        shipment: true,
        payments: true
      },
      orderBy: (i, { desc }) => [desc(i.createdAt)],
    })
  },

  /**
   * Enregistrer un nouveau paiement (CFA)
   */
  async registerPayment(data: {
    invoiceId: string,
    amount: number,
    method: 'ESPECE' | 'ORANGE_MONEY' | 'MOOV_MONEY' | 'VIREMENT',
    reference?: string
  }) {
    return await db.transaction(async (tx) => {
      // 1. Ajouter le paiement
      await tx.insert(payments).values({
        invoiceId: data.invoiceId,
        amount: data.amount,
        method: data.method,
        transactionId: data.reference,
      })

      // 2. Vérifier l'état de la facture
      const invoice = await tx.query.invoices.findFirst({
        where: eq(invoices.id, data.invoiceId),
        with: { payments: true }
      })

      if (!invoice) throw new Error("Facture introuvable")

      // Calculer le total payé incluant les anciens paiements + celui qu'on vient d'insérer
      const previousPaid = invoice.payments.reduce((acc, p) => acc + (p.amount || 0), 0)
      const totalPaidNow = previousPaid + data.amount

      if (totalPaidNow >= invoice.totalAmount) {
        await tx.update(invoices)
          .set({ 
            status: "PAYE", 
            paidAt: new Date()
          })
          .where(eq(invoices.id, data.invoiceId))
      } else {
        await tx.update(invoices)
          .set({ 
            status: "PARTIEL"
          })
          .where(eq(invoices.id, data.invoiceId))
      }

      // 3. Envoyer Notification (Asynchrone hors transaction)
      // Note: On ne l'attend pas pour ne pas bloquer la transaction en cas de lenteur passerelle
      const lastPayment = await tx.query.payments.findFirst({
        where: eq(payments.invoiceId, data.invoiceId),
        orderBy: (p, { desc }) => [desc(p.createdAt)]
      })

      if (lastPayment) {
        notificationService.sendPaymentReceipt(lastPayment.id)
      }

      return { success: true }
    })
  },

  /**
   * Statistiques financières globales
   */
  async getFinanceStats() {
    // 1. Chiffre d'affaires total (Somme des factures)
    const revenueRes = await db.select({
      total: sql<number>`COALESCE(sum(${invoices.totalAmount}), 0)`
    }).from(invoices);

    // 2. Montant réellement encaissé (Somme des paiements)
    const paidRes = await db.select({
      total: sql<number>`COALESCE(sum(${payments.amount}), 0)`
    }).from(payments);

    const totalRevenue = Number(revenueRes[0].total);
    const totalPaid = Number(paidRes[0].total);
    const totalPending = totalRevenue - totalPaid;

    return {
      totalRevenue,
      totalPaid,
      totalPending
    };
  }
}
