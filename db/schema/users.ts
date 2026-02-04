import { 
  pgTable, 
  uuid, 
  varchar, 
  timestamp, 
  text, 
  boolean, 
  pgEnum 
} from "drizzle-orm/pg-core";

/**
 * 1. Définition des rôles
 */
export const userRoleEnum = pgEnum("user_role", [
  "ADMIN", 
  "AGENT_CHINA", 
  "AGENT_BURKINA", 
  "CLIENT"
]);

/**
 * 2. Table Profiles (Gestion autonome)
 */
export const profiles = pgTable("profiles", {
  // ID auto-généré par la DB puisque nous n'utilisons plus Supabase Auth
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  
  // NOUVEAU: Stockage du mot de passe haché
  password: text("password").notNull(), 
  
  // phone est maintenant optionnel car on ne l'a pas forcément au register
  phone: varchar("phone", { length: 20 }).unique(), 
  
  role: userRoleEnum("role").default("CLIENT").notNull(),
  
  address: text("address"), 
  clientCode: varchar("client_code", { length: 10 }).unique(), 
  
  isActive: boolean("is_active").default(true),
  
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * 3. Table des Adresses
 */
export const addresses = pgTable("addresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  label: varchar("label", { length: 50 }), 
  city: varchar("city", { length: 100 }).default("Ouagadougou"),
  details: text("details"),
});