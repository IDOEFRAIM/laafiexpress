import { 
  pgSchema, 
  uuid, 
  varchar, 
  doublePrecision, 
  timestamp, 
  integer,
  boolean 
} from "drizzle-orm/pg-core";
import { shipments } from "./cargo";
import { profiles } from "./users";

export const finance = pgSchema("finance");

/**
 * ENUMS :pour les États de paiement
 */
export const paymentStatusEnum = finance.enum("payment_status", [
  "EN_ATTENTE", 
  "PARTIEL", 
  "PAYE", 
  "RETARD_BLOQUANT" // Déclenché si J-5 (Maritime) ou J-3 (Aérien) dépassé
]);

export const paymentMethodEnum = finance.enum("payment_method", [
  "ESPECE", 
  "ORANGE_MONEY", 
  "MOOV_MONEY", 
  "VIREMENT"
]);

/**
 * TABLE TARIFS (Grille Tarifaire Dynamique)
 * Permet de gérer la grille PROMO vs STANDARD de 2026
 */
export const rates = finance.table("rates", {
  id: uuid("id").defaultRandom().primaryKey(),
  serviceType: varchar("service_type"), // LTA, MCO, EXPRESS, MARITIME_CBM
  standardPrice: integer("standard_price").notNull(), // ex: 12500
  promoPrice: integer("promo_price"),               // ex: 11700
  promoEndDate: timestamp("promo_end_date"),        // Fin de la promo 1 mois
  isActive: boolean("is_active").default(true),
});

/**
 * TABLE INVOICES (Factures Transport)
 */
export const invoices = finance.table("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceNumber: varchar("invoice_number").unique().notNull(), // Ex: INV-2026-001
  shipmentId: uuid("shipment_id").references(() => shipments.id).notNull(),
  clientId: uuid("client_id").references(() => profiles.id).notNull(),
  
  // Détails financiers calculés par le service pricing
  subTotal: doublePrecision("sub_total").notNull(), // Prix brut
  additionalFees: doublePrecision("additional_fees").default(0), // Réorganisation (Règle 3.2)
  totalAmount: doublePrecision("total_amount").notNull(),
  
  status: paymentStatusEnum("status").default("EN_ATTENTE"),
  dueDate: timestamp("due_date").notNull(), // Date limite (J-5 ou J-3 avant expédition)
  
  createdAt: timestamp("created_at").defaultNow(),
  paidAt: timestamp("paid_at"),
});

/**
 * TABLE PAYMENTS (Historique des transactions)
 */
export const payments = finance.table("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceId: uuid("invoice_id").references(() => invoices.id),
  amount: doublePrecision("amount").notNull(),
  method: paymentMethodEnum("method").notNull(),
  transactionId: varchar("transaction_id"), // Ref Orange/Moov Money
  receivedById: uuid("received_by_id").references(() => profiles.id), // Agent à Samandin
  
  createdAt: timestamp("created_at").defaultNow(),
});
// RELATIONS will be defined in index.ts to avoid circular imports
