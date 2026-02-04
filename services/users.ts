import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs"; // N'oublie pas : npm install bcryptjs

export type UserRole = "ADMIN" | "AGENT_CHINA" | "AGENT_BURKINA" | "CLIENT";

/**
 * Interface pour la création (inclut le mot de passe en clair avant hachage)
 */
export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string; // Mot de passe brut venant du formulaire
  role: UserRole;
  phone?: string;
  address?: string;
}

export const UserService = {
  /**
   * Crée un utilisateur avec mot de passe haché
   * Plus besoin d'ID externe, la DB le génère (defaultRandom)
   */
  async createUser(data: CreateUserInput) {
    try {
      // 1. Hachage du mot de passe (sécurité)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      // 2. Insertion en base de données
      const [newUser] = await db
        .insert(profiles)
        .values({
          fullName: data.fullName,
          email: data.email,
          password: hashedPassword,
          role: data.role,
          phone: data.phone || null,
          address: data.address || null,
          updatedAt: new Date(),
        })
        .returning();

      return newUser;
    } catch (error: any) {
      console.error("UserService.createUser Error:", error);
      if (error.code === '23505') {
        throw new Error("Cet email ou ce numéro de téléphone est déjà utilisé.");
      }
      throw new Error("Erreur lors de la création de l'utilisateur.");
    }
  },

  /**
   * Récupère tous les clients
   */
  async getClients() {
    try {
      return await db.query.profiles.findMany({
        where: eq(profiles.role, "CLIENT"),
        orderBy: (p, { asc }) => [asc(p.fullName)],
      });
    } catch (error) {
      console.error("UserService.getClients Error:", error);
      return [];
    }
  },

  /**
   * Trouver un utilisateur par email (utile pour le Login)
   */
  async getUserByEmail(email: string) {
    try {
      const user = await db.query.profiles.findFirst({
        where: eq(profiles.email, email),
      });
      return user || null;
    } catch (error) {
      console.error("UserService.getUserByEmail Error:", error);
      return null;
    }
  },

  /**
   * Récupère un profil par son ID UUID
   */
  async getUserById(id: string) {
    try {
      const user = await db.query.profiles.findFirst({
        where: eq(profiles.id, id),
      });
      return user || null;
    } catch (error) {
      console.error("UserService.getUserById Error:", error);
      return null;
    }
  },

  /**
   * Mise à jour (on ne met pas à jour le password ici, 
   * il faudrait une fonction dédiée pour la sécurité)
   */
  async updateUser(id: string, data: Partial<Omit<CreateUserInput, "password">>) {
    try {
      const [updated] = await db
        .update(profiles)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, id))
        .returning();

      return updated;
    } catch (error) {
      console.error("UserService.updateUser Error:", error);
      throw new Error("Échec de la mise à jour.");
    }
  },

  /**
   * Suppression
   */
  async deleteUser(id: string) {
    try {
      await db.delete(profiles).where(eq(profiles.id, id));
      return { success: true };
    } catch (error) {
      console.error("UserService.deleteUser Error:", error);
      throw new Error("Erreur lors de la suppression.");
    }
  },
};