import { db } from "@/db"
import { invoices, payments } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

export const InvoiceService = {
  /**
   * Enregistre un paiement et met à jour dynamiquement le statut de la facture
   */
  async recordPayment(data: {
    invoiceId: string
    amount: number
    method: "ESPECE" | "ORANGE_MONEY" | "MOOV_MONEY" | "VIREMENT"
    transactionId?: string
    receivedById: string
  }) {
    return await db.transaction(async (tx) => {
      // 1. Création du reçu
      await tx.insert(payments).values({
        invoiceId: data.invoiceId,
        amount: data.amount,
        method: data.method,
        transactionId: data.transactionId,
        receivedById: data.receivedById,
      })

      // 2. Récupération des données pour calcul
      const [invoice] = await tx
        .select()
        .from(invoices)
        .where(eq(invoices.id, data.invoiceId))

      if (!invoice) throw new Error("Facture introuvable")

      const [paymentSum] = await tx
        .select({ total: sql<number>`sum(amount)` })
        .from(payments)
        .where(eq(payments.invoiceId, data.invoiceId))

      const totalPaid = Number(paymentSum?.total || 0)

      // 3. Logique métier du statut
      let newStatus: "EN_ATTENTE" | "PARTIEL" | "PAYE" = "PARTIEL"
      let paidAt = null

      if (totalPaid >= invoice.totalAmount) {
        newStatus = "PAYE"
        paidAt = new Date()
      } else if (totalPaid <= 0) {
        newStatus = "EN_ATTENTE"
      }

      // 4. Mise à jour de la facture
      const [updatedInvoice] = await tx
        .update(invoices)
        .set({ status: newStatus, paidAt })
        .where(eq(invoices.id, data.invoiceId))
        .returning()

      return { updatedInvoice, newStatus }
    })
  },

  async getInvoiceDetails(id: string) {
    return await db.query.invoices.findFirst({
      where: eq(invoices.id, id),
      with: { payments: true }
    })
  }
}