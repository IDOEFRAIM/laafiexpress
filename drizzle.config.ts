import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement (important pour les scripts hors Next.js)
dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: './db/schema/index.ts', // Vérifie si ton dossier est dans 'src' ou à la racine
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // CRUCIAL : Liste tes schémas pour que Drizzle les détecte
  schemaFilter: ["public", "logistics", "finance"], 
  
  // Optionnel : Aide à la gestion des changements de noms de colonnes
  verbose: true,
  strict: true,
});