import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import * as schema from '@/db/schema';

// Profils
export type Profile = InferSelectModel<typeof schema.profiles>;
export type NewProfile = InferInsertModel<typeof schema.profiles>;

// Colis
export type Shipment = InferSelectModel<typeof schema.shipments>;
export type NewShipment = InferInsertModel<typeof schema.shipments>;

// Factures
export type Invoice = InferSelectModel<typeof schema.invoices>;