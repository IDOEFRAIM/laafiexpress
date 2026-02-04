import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema'; // Importe ton index de schémas

const connectionString = process.env.DATABASE_URL!;

// Empêche de créer plusieurs connexions en mode développement (Hot Reload)
const client = postgres(connectionString);

export const db = drizzle(client, { schema });
export type DbClient = typeof db;