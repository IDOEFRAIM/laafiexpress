'use server'

import { notificationService } from "@/services/notifications"
import { revalidatePath } from "next/cache"

export async function sendBulkUpdateAction(type: 'AERIEN' | 'MARITIME') {
  try {
    const res = await notificationService.sendBulkUpdate(type)
    revalidatePath('/')
    return res
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function sendIndividualUpdateAction(shipmentId: string, status: any) {
  try {
    const res = await notificationService.sendIndividualUpdate(shipmentId, status)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
