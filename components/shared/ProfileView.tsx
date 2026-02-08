"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Calendar, 
  Save, 
  Loader2, 
  CheckCircle2,
  Hash,
  Pencil
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { updateProfileAction } from '@/actions/profile'
import { useRouter } from 'next/navigation'

interface ProfileViewProps {
  profile: {
    id: string
    fullName: string
    email: string
    phone?: string | null
    address?: string | null
    role: string
    clientCode?: string | null
    createdAt?: string
  }
}

const roleLabels: Record<string, string> = {
  ADMIN: "Administrateur",
  AGENT_CHINA: "Agent Chine (Guangzhou)",
  AGENT_BURKINA: "Agent Burkina (Samandin)",
  CLIENT: "Client",
}

const roleColors: Record<string, string> = {
  ADMIN: "bg-purple-600",
  AGENT_CHINA: "bg-red-600",
  AGENT_BURKINA: "bg-green-600",
  CLIENT: "bg-blue-600",
}

export function ProfileView({ profile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    fullName: profile.fullName || '',
    phone: profile.phone || '',
    address: profile.address || '',
  })
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    setSuccess(false)
    const res = await updateProfileAction(form)
    if (res.success) {
      setSuccess(true)
      setIsEditing(false)
      router.refresh()
      setTimeout(() => setSuccess(false), 3000)
    } else {
      alert(res.error || "Erreur")
    }
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
          Mon <span className="text-blue-600">Profil</span>
        </h1>
        <p className="text-zinc-400 font-bold text-xs mt-2 uppercase tracking-[0.3em]">
          Informations personnelles & Paramètres du compte
        </p>
      </div>

      {/* Avatar & Role Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <div className="w-28 h-28 rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-inner ring-4 ring-white dark:ring-zinc-900">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className={cn(
            "absolute -bottom-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg",
            roleColors[profile.role] || "bg-blue-600"
          )}>
            <Shield className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-black italic tracking-tighter text-zinc-900 dark:text-white">
            {profile.fullName}
          </h2>
          <p className="text-zinc-400 font-bold text-sm mt-1">{profile.email}</p>
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700">
            <div className={cn("w-2 h-2 rounded-full", roleColors[profile.role] || "bg-blue-600")} />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              {roleLabels[profile.role] || profile.role}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-end">
          {profile.clientCode && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
              <Hash className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-black text-blue-600 tracking-tight">{profile.clientCode}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <Calendar className="w-3 h-3" />
            Membre depuis {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '--'}
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-zinc-50 dark:border-zinc-800/50 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Informations personnelles</h4>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              isEditing 
                ? "bg-red-50 text-red-600 hover:bg-red-100" 
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            )}
          >
            <Pencil className="w-3 h-3" />
            {isEditing ? "Annuler" : "Modifier"}
          </button>
        </div>

        <div className="p-8 space-y-6">
          <ProfileField 
            icon={User} 
            label="Nom complet" 
            value={form.fullName} 
            editable={isEditing}
            onChange={(v) => setForm(prev => ({ ...prev, fullName: v }))}
          />
          <ProfileField 
            icon={Mail} 
            label="Email" 
            value={profile.email} 
            editable={false}
            hint="L'email ne peut pas être modifié"
          />
          <ProfileField 
            icon={Phone} 
            label="Téléphone" 
            value={form.phone} 
            placeholder="+226 70 00 00 00"
            editable={isEditing}
            onChange={(v) => setForm(prev => ({ ...prev, phone: v }))}
          />
          <ProfileField 
            icon={MapPin} 
            label="Adresse" 
            value={form.address} 
            placeholder="Ouagadougou, Secteur..."
            editable={isEditing}
            onChange={(v) => setForm(prev => ({ ...prev, address: v }))}
          />
        </div>

        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-end"
          >
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="h-14 px-10 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-3"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              Enregistrer
            </button>
          </motion.div>
        )}
      </div>

      {/* Success Toast */}
      {success && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 bg-green-600 text-white rounded-2xl shadow-2xl shadow-green-500/30 z-50"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-bold text-sm">Profil mis à jour avec succès</span>
        </motion.div>
      )}
    </div>
  )
}

function ProfileField({ 
  icon: Icon, 
  label, 
  value, 
  placeholder,
  editable, 
  hint,
  onChange 
}: { 
  icon: any
  label: string
  value: string
  placeholder?: string
  editable: boolean
  hint?: string
  onChange?: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-6 group">
      <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-blue-600 transition-colors shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
        {editable && onChange ? (
          <input 
            type="text" 
            value={value} 
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        ) : (
          <div>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">{value || '--'}</p>
            {hint && <p className="text-[9px] text-zinc-400 mt-1 italic">{hint}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
