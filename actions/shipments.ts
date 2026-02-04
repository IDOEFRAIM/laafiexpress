'use server'

import { createClient } from "@/lib/supabase/server"
import { shipmentSchema } from "@/lib/validations/shipment"
import { ShipmentService } from "@/services/shipments"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers" 
import { z } from "zod"
import { notificationService } from "@/services/notifications"

export async function createShipmentAction(formData: z.infer<typeof shipmentSchema>) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")
    if (!sessionCookie) return { success: false, error: "Non autorisé" }
    
    const sessionData = JSON.parse(sessionCookie.value)
    const userId = sessionData.id

    // Validation Zod
    const validatedFields = shipmentSchema.parse(formData)

    // Appel du service unique
    const result = await ShipmentService.createWithInvoice(validatedFields, userId)

    revalidatePath('/agent_chine')
    revalidatePath('/agent_burkina')
    revalidatePath('/client')
    revalidatePath('/admin')
    
    return { success: true, data: result }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Retourne uniquement le message clair du premier champ en erreur
      return { success: false, error: error.issues[0]?.message || "Données de formulaire invalides" }
    }
    console.error("Action Error:", error)
    return { success: false, error: "Une erreur technique est survenue" }
  }
}

export async function updateShipmentStatusAction(shipmentId: string, status: string) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")
    if (!sessionCookie) return { success: false, error: "Non autorisé" }
    
    await ShipmentService.updateStatus(shipmentId, status)

    // Trigger notification (asynchronous)
    notificationService.sendIndividualUpdate(shipmentId, status as any)

    revalidatePath('/agent_chine')
    revalidatePath('/agent_burkina')
    revalidatePath('/client')
    revalidatePath('/admin')
    
    return { success: true }
  } catch (error: any) {
    console.error("Update Status Error:", error)
    return { success: false, error: error.message || "Échec de la mise à jour" }
  }
}
