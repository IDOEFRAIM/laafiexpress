import Link from 'next/link'
import { cookies } from 'next/headers'
import { Button } from '@/components/ui/button'
import { 
  LogOut, 
  User, 
  Ship, 
  Package, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react'

export async function Navbar() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  
  let user = null
  if (sessionCookie) {
    try {
      user = JSON.parse(sessionCookie.value)
    } catch (e) {
      user = null
    }
  }

  // Fonction pour transformer le rôle technique en nom lisible
  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      'AGENT_CHINA': 'Logistique Chine',
      'AGENT_BURKINA': 'Réception Faso',
      'CLIENT': 'Espace Client',
      'ADMIN': 'Administration'
    }
    return roles[role] || role
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Ship size={20} className="text-white" />
            </div>
            <Link href="/" className="text-xl font-black tracking-tighter text-slate-900">
              LAAFI<span className="text-blue-600 underline decoration-2 underline-offset-4">EXPRESS</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-8">
                {/* Liens Dynamiques selon Rôle */}
                <div className="flex items-center gap-4">
                  {user.role === 'AGENT_CHINA' && (
                    <NavLink href="/agent_chine" icon={<Ship size={18} />} label="Expéditions" />
                  )}
                  {user.role === 'AGENT_BURKINA' && (
                    <NavLink href="/agent_burkina" icon={<Package size={18} />} label="Arrivages" />
                  )}
                  {user.role === 'CLIENT' && (
                    <NavLink href="/client" icon={<Package size={18} />} label="Suivi Colis" />
                  )}
                  {user.role === 'ADMIN' && (
                    <NavLink href="/admin" icon={<ShieldCheck size={18} />} label="Panel Admin" />
                  )}
                </div>

                {/* Profil & Logout */}
                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                  <div className="text-right mr-2">
                    <p className="text-xs font-bold text-slate-900 leading-tight">Connecté</p>
                    <p className="text-[10px] text-blue-600 uppercase font-bold tracking-wider">
                      {getRoleLabel(user.role)}
                    </p>
                  </div>
                  
                  <form action="/api/auth/logout" method="POST">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-10 w-10 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                      title="Se déconnecter"
                    >
                      <LogOut size={20} />
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              /* État Déconnecté */
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-slate-600 font-semibold hover:text-blue-600">
                    Connexion
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 px-6 rounded-full transition-all flex items-center gap-2">
                    Ouvrir un compte <ChevronRight size={16} />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

// Petit composant utilitaire pour les liens
function NavLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      href={href} 
      className="text-sm font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-2 transition-colors py-2 px-1 border-b-2 border-transparent hover:border-blue-600"
    >
      {icon}
      {label}
    </Link>
  )
}