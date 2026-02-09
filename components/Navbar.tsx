'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  LogOut, 
  Ship, 
  Package, 
  ShieldCheck, 
  Menu, 
  X, 
  UserCircle,
  Info,
  Truck,
  Tag,
  Phone
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  user?: {
    role: string;
    name?: string;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <nav className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* --- LOGO --- */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 rotate-3">
              <Ship size={24} className="text-white -rotate-3" />
            </div>
            <Link href="/" className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
                LAAFI<span className="text-blue-600">CARGO</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">International</span>
            </Link>
          </div>

          {/* --- DESKTOP NAV --- */}
          <div className="hidden md:flex items-center gap-8">
            {/* Liens de navigation ancres (Visibles pour tous) */}
            <div className="flex items-center gap-1">
              <NavLink href="/#about" icon={<Info size={16} />} label="À propos" />
              <NavLink href="/#services" icon={<Truck size={16} />} label="Services" />
              <NavLink href="/#pricing" icon={<Tag size={16} />} label="Tarifs" />
              <NavLink href="/#contact" icon={<Phone size={16} />} label="Contact" />
            </div>

            {user ? (
              <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                <div className="flex items-center gap-3 mr-2">
                  {user.role === 'AGENT_CHINA' && <Button variant="outline" size="sm" asChild className="rounded-lg font-bold"><Link href="/agent_chine">Dashboard</Link></Button>}
                  {user.role === 'CLIENT' && <Button variant="outline" size="sm" asChild className="rounded-lg font-bold"><Link href="/client">Suivi</Link></Button>}
                  {user.role === 'ADMIN' && <Button variant="outline" size="sm" asChild className="rounded-lg font-bold"><Link href="/admin">Admin</Link></Button>}
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-blue-600 uppercase font-black leading-none">{getRoleLabel(user.role)}</p>
                  <p className="text-xs font-bold text-slate-900">Connecté</p>
                </div>
                <form action="/api/auth/logout" method="POST">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 hover:text-red-600">
                    <LogOut size={20} />
                  </Button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                  Connexion
                </Link>
                <Link href="/register">
                  <Button className="bg-slate-900 hover:bg-blue-600 text-white px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl">
                    Compte
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* --- MOBILE BURGER --- */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b shadow-2xl p-4 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 gap-1">
            <MobileNavLink href="/#about" label="À propos" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/#services" label="Services" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/#pricing" label="Tarifs" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/#contact" label="Contact" onClick={() => setIsOpen(false)} />
          </div>

          <div className="h-px bg-slate-100 my-2" />

          {user ? (
            <div className="space-y-4">
               <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                  <UserCircle size={40} className="text-blue-600" />
                  <div>
                    <p className="text-sm font-black text-slate-900">{getRoleLabel(user.role)}</p>
                    <Link href={user.role === 'CLIENT' ? '/client' : '/admin'} onClick={() => setIsOpen(false)} className="text-xs text-blue-600 font-bold underline">Aller au tableau de bord</Link>
                  </div>
                </div>
                <form action="/api/auth/logout" method="POST">
                  <Button className="w-full justify-start gap-3 bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none">
                    <LogOut size={18} /> Déconnexion
                  </Button>
                </form>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Link href="/login" onClick={() => setIsOpen(false)} className="py-4 text-center font-bold text-slate-900 border border-slate-200 rounded-2xl italic">Connexion</Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="py-4 text-center font-bold text-white bg-blue-600 rounded-2xl">S'inscrire</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="group flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-blue-600 transition-all px-3 py-2 rounded-lg hover:bg-blue-50/50">
      <span className="text-slate-400 group-hover:text-blue-600 transition-colors">
        {icon}
      </span>
      {label}
    </Link>
  )
}

function MobileNavLink({ href, label, onClick }: { href: string, label: string, onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block w-full p-4 text-base font-bold text-slate-900 hover:bg-slate-50 rounded-xl transition-colors italic">
      {label}
    </Link>
  )
}