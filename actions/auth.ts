'use server'

import { UserService } from "@/services/users"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import bcrypt from "bcryptjs"

// Si vous utilisez JWT, importez votre logique ici, sinon voici une version simple avec cookies

export async function loginAction(formData: { email: string; password: string }) {
  try {
    // 1. Vérification de l'utilisateur en base de données
    const user = await UserService.getUserByEmail(formData.email)

    if (!user) {
      return { success: false, error: "Cet email n'existe pas." }
    }

    if (!user.password) {
      return { success: false, error: "Compte mal configuré. Contactez un admin." }
    }

    // 2. Comparaison du mot de passe haché
    const isPasswordValid = await bcrypt.compare(formData.password, user.password)

    if (!isPasswordValid) {
      return { success: false, error: "Mot de passe incorrect." }
    }

    // 3. Création de la session (Cookie sécurisé)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
    
    const cookieStore = await cookies()
    cookieStore.set("session", JSON.stringify({ id: user.id, role: user.role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    })

    return { success: true, role: user.role }

  } catch (error: any) {
    console.error("Erreur détaillée loginAction:", error)
    return { success: false, error: "Une erreur technique est survenue sur le serveur." }
  }
}

export async function registerAction(formData: {
  email: string
  fullName: string
  role: "AGENT_CHINA" | "AGENT_BURKINA" | "CLIENT"
  password: string
  phone: string    // AJOUTÉ
  address: string  // AJOUTÉ
}) {
  try {
    // 1. On passe TOUTES les données au service
    const newUser = await UserService.createUser({
      email: formData.email,
      fullName: formData.fullName,
      role: formData.role,
      password: formData.password,
      phone: formData.phone,      // AJOUTÉ
      address: formData.address,  // AJOUTÉ
    })

    if (!newUser) {
      return { success: false, error: "Impossible de créer l'utilisateur." }
    }

    // 2. Succès
    return { success: true }
  } catch (error: any) {
    // On capture les erreurs de doublon (ex: email déjà utilisé)
    if (error.message?.includes('unique constraint')) {
       return { success: false, error: "Cet email ou ce numéro est déjà utilisé." }
    }
    
    console.error("Register Action Error:", error.message)
    return { success: false, error: "Erreur lors de l'inscription." }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}
