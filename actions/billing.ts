'use server'

import { BillingService } from "@/services/billing"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function registerPaymentAction(data: {
  invoiceId: string,
  amount: number,
  paymentMethod: any,
  reference?: string
}) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")
    if (!sessionCookie) return { success: false, error: "Non autorisé" }
    
    await BillingService.registerPayment({
      invoiceId: data.invoiceId,
      amount: data.amount,
      method: data.paymentMethod,
      reference: data.reference
    })

    revalidatePath('/agent_chine/billing')
    revalidatePath('/client/shipments')
    return { success: true }
  } catch (error: any) {
    console.error("Payment Action Error:", error)
    return { success: false, error: error.message || "Erreur lors du paiement" }
  }
}