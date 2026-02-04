import { 
  pgTable, 
  uuid, 
  varchar, 
  doublePrecision, 
  timestamp, 
  text,
  pgEnum 
} from "drizzle-orm/pg-core";
import { profiles } from "./users";

/**
 * ENUMS : Types de transport et Statuts
 */
export const transportTypeEnum = pgEnum("transport_type", ["AERIEN", "MARITIME"]);

export const shipmentCategoryEnum = pgEnum("shipment_category", [
  "LTA", 
  "MCO", 
  "EXPRESS", 
  "CONTAINER"
]);

export const shipmentStatusEnum = pgEnum("shipment_status", [
  "RECU_CHINE",        // Arrivé à l'entrepôt Guangzhou/Foshan
  "EN_COURS_GROUPAGE", // Mis en carton/palette
  "CHARGE_TRANSIT",    // Dans l'avion ou le bateau
  "ARRIVE_OUAGA",      // Déchargé à Samandin
  "LIVRE",             // Remis au client
  "LITIGE_BLOQUE"      // Problème douane ou paiement
]);

/**
 * TABLE CONTAINERS
 * Pour le groupage maritime (Règle 3.4)
 */
export const containers = pgTable("containers", {
  id: uuid("id").primaryKey().defaultRandom(),
  containerNumber: varchar("container_number").unique().notNull(), // Ex: MSKU123456
  departureDate: timestamp("departure_date"),
  estimatedArrival: timestamp("estimated_arrival"),
  status: varchar("status").default("OUVERT"), // OUVERT, FERME, EN_MER, ARRIVE
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * TABLE SHIPMENTS (Le cœur de Laafi Express)
 */
export const shipments = pgTable("shipments", {
  id: uuid("id").primaryKey().defaultRandom(),
  trackingNumber: varchar("tracking_number").unique().notNull(),
  
  // Relations
  clientId: uuid("client_id").references(() => profiles.id).notNull(),
  containerId: uuid("container_id").references(() => containers.id),
  
  // Audit : L'agent qui a créé le colis (L'ajout que tu voulais)
  createdBy: uuid("created_by").references(() => profiles.id),

  // Détails colis
  type: transportTypeEnum("type").notNull(),
  category: shipmentCategoryEnum("category").notNull(),
  contentDescription: text("content_description"),
  
  // Dimensions (Règles 3.1 & 4.1)
  weight: doublePrecision("weight"), // Pour l'aérien (kg)
  cbm: doublePrecision("cbm"),       // Pour le maritime (m3)
  
  imageUrl: varchar("image_url"),    // Photo du colis à la réception
  invoiceUrl: varchar("invoice_url"),  // Facture (Maritime)
  destination: varchar("destination").default("Ouagadougou (Samandin)"), // AJOUTÉ
  status: shipmentStatusEnum("status").default("RECU_CHINE"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// RELATIONS will be defined in index.ts to avoid circular imports