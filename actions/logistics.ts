'use server'

import { LogisticsService } from "@/services/logistics"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function createContainerAction(data: { containerNumber: string, departureDate: Date }) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")
    if (!sessionCookie) return { success: false, error: "Non autorisé" }
    
    await LogisticsService.createContainer(data)
    
    revalidatePath('/agent_chine/logistics')
    return { success: true }
  } catch (error) {
    return { success: false, error: "Erreur lors de la création" }
  }
}

export async function updateContainerStatusAction(
  containerId: string, 
  newStatus: "OUVERT" | "FERME" | "EN_MER" | "ARRIVE"
) {
  try {
    await LogisticsService.updateContainerLifecycle(containerId, newStatus)
    
    revalidatePath('/agent_chine/logistics')
    revalidatePath('/agent_burkina/logistics')
    revalidatePath('/client/shipments')
    return { success: true }
  } catch (error) {
    return { success: false, error: "Erreur lors de la mise à jour globale" }
  }
}

export async function addShipmentsToContainerAction(containerId: string, shipmentIds: string[]) {
  try {
    await LogisticsService.addShipmentsToContainer(containerId, shipmentIds)
    revalidatePath('/agent_chine/logistics')
    return { success: true }
  } catch (error) {
    return { success: false, error: "Erreur lors de l'ajout des colis" }
  }
}
