'use server'

import { UserService } from "@/services/users"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

export async function updateProfileAction(data: {
  fullName?: string
  phone?: string
  address?: string
}) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")
    if (!sessionCookie) return { success: false, error: "Non autorisé" }

    const sessionData = JSON.parse(sessionCookie.value)
    const userId = sessionData.id

    await UserService.updateUser(userId, {
      fullName: data.fullName,
      phone: data.phone || undefined,
      address: data.address || undefined,
    })

    revalidatePath('/agent_burkina/profile')
    revalidatePath('/agent_chine/profile')
    revalidatePath('/client/profile')
    revalidatePath('/admin/profile')

    return { success: true }
  } catch (error: any) {
    console.error("Update Profile Error:", error)
    return { success: false, error: error.message || "Erreur lors de la mise à jour" }
  }
}

export async function changePasswordAction(data: {
  currentPassword: string
  newPassword: string
}) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")
    if (!sessionCookie) return { success: false, error: "Non autorisé" }

    const sessionData = JSON.parse(sessionCookie.value)
    const user = await UserService.getUserById(sessionData.id)

    if (!user) return { success: false, error: "Utilisateur introuvable" }

    const isValid = await bcrypt.compare(data.currentPassword, user.password)
    if (!isValid) return { success: false, error: "Mot de passe actuel incorrect" }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.newPassword, salt)

    const { db } = await import("@/db")
    const { profiles } = await import("@/db/schema")
    const { eq } = await import("drizzle-orm")

    await db.update(profiles)
      .set({ password: hashedPassword, updatedAt: new Date() })
      .where(eq(profiles.id, sessionData.id))

    return { success: true }
  } catch (error: any) {
    console.error("Change Password Error:", error)
    return { success: false, error: error.message || "Erreur lors du changement de mot de passe" }
  }
}

export async function getProfileAction() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")
    if (!sessionCookie) return null

    const sessionData = JSON.parse(sessionCookie.value)
    const user = await UserService.getUserById(sessionData.id)

    if (!user) return null

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      clientCode: user.clientCode,
      createdAt: user.createdAt?.toISOString(),
    }
  } catch {
    return null
  }
}
