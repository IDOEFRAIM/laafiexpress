import { createBrowserClient } from '@supabase/ssr'

/**
 * Client Supabase pour le Navigateur (Client-Side)
 * Utilisé pour :
 * - Inscription/Connexion des clients
 * - Récupération du statut des colis en temps réel
 * - Upload des photos de colis (Storage)
 */
export function createClient() {
  // On utilise createBrowserClient de @supabase/ssr pour gérer l'auth avec les cookies
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}