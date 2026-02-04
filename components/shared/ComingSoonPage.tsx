"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface ComingSoonPageProps {
  title: string
  iconName: 'Package' | 'Truck' | 'Users' | 'Settings' | 'LayoutDashboard'
  description: string
}

import { Package, Truck, Users, Settings, LayoutDashboard } from 'lucide-react'

const iconMap = {
  Package,
  Truck,
  Users,
  Settings,
  LayoutDashboard,
} as const

export default function ComingSoonPage({ title, iconName, description }: ComingSoonPageProps) {
  const router = useRouter()
  const Icon = iconMap[iconName]
  
  return (
    <div className="p-8 pt-24 min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center italic">
      <div className="max-w-md w-full text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/10"
        >
          <Icon className="w-10 h-10 text-blue-600" />
        </motion.div>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tighter italic uppercase underline decoration-blue-500 decoration-4 underline-offset-8">
          {title}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-12">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
            <div className="text-blue-600 font-black text-xl mb-1">95%</div>
            <div className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Prêt</div>
          </div>
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
            <div className="text-blue-600 font-black text-xl mb-1">Beta</div>
            <div className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Statut</div>
          </div>
        </div>

        <button 
          onClick={() => router.back()}
          className="flex items-center justify-center gap-2 mx-auto text-sm font-black text-zinc-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour
        </button>
      </div>
    </div>
  )
}
