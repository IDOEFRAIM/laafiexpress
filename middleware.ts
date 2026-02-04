// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  const sessionCookie = request.cookies.get('session')

  let sessionData = null
  if (sessionCookie) {
    try {
      sessionData = JSON.parse(sessionCookie.value)
    } catch (e) {
      console.error("Session invalide")
    }
  }

  const role = sessionData?.role // "AGENT_CHINA", "AGENT_BURKINA", "CLIENT", "ADMIN"
  const isLoggedIn = !!sessionData

  const isAuthPage = url.pathname.startsWith('/login') || url.pathname.startsWith('/register')
  
  // Routes correspondant à tes dossiers dans (dashboard)
  const isAgentChine = url.pathname.startsWith('/agent_chine')
  const isAgentBurkina = url.pathname.startsWith('/agent_burkina')
  const isClient = url.pathname.startsWith('/client')
  const isAdmin = url.pathname.startsWith('/admin')
  const isProtectedRoute = isAgentChine || isAgentBurkina || isClient || isAdmin

  // 1. Si l'utilisateur est sur une page d'auth mais est déjà connecté
  if (isAuthPage && isLoggedIn) {
    return redirectToHome(role, request)
  }

  // 2. Protection : Si pas de session et tente d'accéder à une route privée
  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // 3. Sécurité : Vérification stricte des accès par grade
  if (isLoggedIn) {
    if (isAgentChine && role !== 'AGENT_CHINA') return redirectToHome(role, request)
    if (isAgentBurkina && role !== 'AGENT_BURKINA') return redirectToHome(role, request)
    if (isClient && role !== 'CLIENT') return redirectToHome(role, request)
    if (isAdmin && role !== 'ADMIN') return redirectToHome(role, request)
  }

  return NextResponse.next()
}

// Fonction pour renvoyer l'utilisateur au bon endroit s'il se perd
function redirectToHome(role: string, request: NextRequest) {
  const routes = {
    AGENT_CHINA: '/agent_chine',
    AGENT_BURKINA: '/agent_burkina',
    CLIENT: '/client',
    ADMIN: '/admin'
  }
  const fallback = routes[role as keyof typeof routes] || '/login'
  return NextResponse.redirect(new URL(fallback, request.url))
}

export const config = {
  matcher: ['/agent_chine/:path*', '/agent_burkina/:path*', '/client/:path*', '/admin/:path*', '/login', '/register'],
}