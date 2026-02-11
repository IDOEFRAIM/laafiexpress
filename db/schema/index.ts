import { relations } from "drizzle-orm";
import { profiles } from "./users";
import { shipments, containers } from "./cargo";
import { invoices, payments } from "./billing";

// Export des schémas physiques
export * from "./users";
export * from "./cargo";
export * from "./billing";

/**
 * RELATIONS : Laafi Cargo Logic
 */

// Un Client a plusieurs Colis et plusieurs Factures
export const profilesRelations = relations(profiles, ({ many }) => ({
  shipments: many(shipments, { relationName: "client_shipments" }),
  invoices: many(invoices),
}));

// Un Colis appartient à un Client et peut être dans UN Conteneur
export const shipmentsRelations = relations(shipments, ({ one, many }) => ({
  client: one(profiles, {
    fields: [shipments.clientId],
    references: [profiles.id],
    relationName: "client_shipments",
  }),
  agent: one(profiles, {
    fields: [shipments.createdBy],
    references: [profiles.id],
    relationName: "agent_created_shipments",
  }),
  container: one(containers, {
    fields: [shipments.containerId],
    references: [containers.id],
  }),
  invoices: many(invoices),
}));

// Un Conteneur contient plusieurs Colis (Groupage)
export const containersRelations = relations(containers, ({ many }) => ({
  shipments: many(shipments),
}));

// Une Facture appartient à un Client et un Colis, et a plusieurs Paiements
export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  client: one(profiles, {
    fields: [invoices.clientId],
    references: [profiles.id],
  }),
  shipment: one(shipments, {
    fields: [invoices.shipmentId],
    references: [shipments.id],
  }),
  payments: many(payments),
}));

// Un Paiement est lié à une Facture
export const paymentsRelations = relations(payments, ({ one }) => ({
  invoice: one(invoices, {
    fields: [payments.invoiceId],
    references: [invoices.id],
  }),
}));