"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Users, 
  Settings, 
  LogOut,
  Box,
  ChevronRight,
  CreditCard
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { logoutAction } from "@/actions/auth"

const getMenuItems = (role: string) => {
  const roleLower = role.toLowerCase()
  let basePath = `/${roleLower}`
  
  if (roleLower === 'agent_china' || roleLower === 'agent_chine') {
    basePath = '/agent_chine'
  }
  
  const items = [
    { icon: LayoutDashboard, label: "Dashboard", href: basePath },
    { icon: Package, label: "Envois", href: `${basePath}/shipments` },
  ]

  if (roleLower === 'agent_china' || roleLower === 'agent_chine' || roleLower === 'admin' || roleLower === 'agent_burkina') {
    items.push({ icon: Truck, label: "Logistique", href: `${basePath}/logistics` })
  }

  // Tous les rôles ont accès à la facturation (Côté agent pour gérer, côté client pour voir)
  items.push({ icon: CreditCard, label: "Facturation", href: `${basePath}/billing` })

  //items.push(
   // { icon: Users, label: "Profil", href: `${basePath}/profile` },
   // { icon: Settings, label: "Paramètres", href: `${basePath}/settings` },
  //)
  
  return items
}

export function DashboardSidebar({ role = "client" }: { role?: string }) {
  const pathname = usePathname()
  const menuItems = getMenuItems(role)

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center py-8 bg-white dark:bg-zinc-950 border-r border-zinc-100 dark:border-zinc-900 z-50">
      {/* Logo */}
      <div className="mb-12">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Box className="text-white w-6 h-6" />
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-8">
        {menuItems.map((item) => {
          const isActive = item.href !== "#" && pathname.startsWith(item.href)
          return (
            <Link key={item.label} href={item.href} className="relative group">
              <div className={cn(
                "p-3 rounded-xl transition-all duration-300 relative z-10",
                isActive 
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" 
                  : "text-zinc-400 hover:text-blue-600 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              )}>
                <item.icon className="w-6 h-6" />
              </div>
              
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-600 rounded-r-full"
                />
              )}

              {/* Tooltip purely for UX if collapsed */}
              <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-zinc-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="mt-auto flex flex-col gap-6 items-center">
        <button className="p-3 text-zinc-400 hover:text-blue-600 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl transition-all">
          <ChevronRight className="w-6 h-6" />
        </button>
        <button 
          onClick={() => logoutAction()}
          className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </aside>
  )
}
