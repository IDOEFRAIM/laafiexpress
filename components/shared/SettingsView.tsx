"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Save, 
  Loader2, 
  CheckCircle2, 
  Bell, 
  Globe,
  Moon,
  Sun,
  Shield,
  Smartphone,
  AlertTriangle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { changePasswordAction } from '@/actions/profile'

interface SettingsViewProps {
  role: string
}

export function SettingsView({ role }: SettingsViewProps) {
  const [activeSection, setActiveSection] = useState('security')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChangePassword = async () => {
    setError('')
    if (passwordForm.newPassword.length < 6) {
      setError("Le nouveau mot de passe doit contenir au moins 6 caractères")
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    setIsLoading(true)
    const res = await changePasswordAction({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    })

    if (res.success) {
      setSuccess(true)
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError(res.error || "Erreur")
    }
    setIsLoading(false)
  }

  const sections = [
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Préférences', icon: Globe },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
          Mes <span className="text-blue-600">Paramètres</span>
        </h1>
        <p className="text-zinc-400 font-bold text-xs mt-2 uppercase tracking-[0.3em]">
          Sécurité • Notifications • Préférences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-1.5 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 w-fit">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
              activeSection === sec.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            )}
          >
            <sec.icon className="w-4 h-4" />
            {sec.label}
          </button>
        ))}
      </div>

      {/* Security Section */}
      {activeSection === 'security' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden"
        >
          <div className="p-8 border-b border-zinc-50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Changer le mot de passe</h4>
          </div>

          <div className="p-8 space-y-6">
            {/* Current Password */}
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Mot de passe actuel</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type={showCurrent ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full h-14 pl-12 pr-14 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm"
                  placeholder="••••••••"
                />
                <button 
                  onClick={() => setShowCurrent(!showCurrent)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Nouveau mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type={showNew ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full h-14 pl-12 pr-14 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm"
                  placeholder="Min. 6 caractères"
                />
                <button 
                  onClick={() => setShowNew(!showNew)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Confirmer le nouveau mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full h-14 pl-12 pr-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm"
                  placeholder="Confirmer"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-bold">{error}</p>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleChangePassword}
                disabled={isLoading}
                className="h-14 px-10 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-3"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Mettre à jour
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications Section */}
      {activeSection === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden"
        >
          <div className="p-8 border-b border-zinc-50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Préférences de notification</h4>
          </div>

          <div className="p-8 space-y-6">
            <NotificationToggle 
              icon={Smartphone}
              title="Notifications SMS"
              description="Recevez des mises à jour par SMS sur vos colis."
              defaultEnabled={true}
            />
            <NotificationToggle 
              icon={Bell}
              title="Alertes d'arrivée"
              description="Soyez notifié dès l'arrivée de votre colis à Ouagadougou."
              defaultEnabled={true}
            />
            <NotificationToggle 
              icon={Shield}
              title="Alertes de paiement"
              description="Rappels de paiement avant la date limite."
              defaultEnabled={true}
            />
          </div>
        </motion.div>
      )}

      {/* Preferences Section */}
      {activeSection === 'preferences' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden"
        >
          <div className="p-8 border-b border-zinc-50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Préférences générales</h4>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white">Langue</p>
                  <p className="text-[10px] text-zinc-400 font-bold">Langue de l'interface</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-xl text-sm font-bold text-zinc-600 dark:text-zinc-300">
                Français 🇫🇷
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white">Thème</p>
                  <p className="text-[10px] text-zinc-400 font-bold">Apparence de l'interface</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-xl text-sm font-bold text-zinc-600 dark:text-zinc-300">
                Automatique
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Success Toast */}
      {success && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 bg-green-600 text-white rounded-2xl shadow-2xl shadow-green-500/30 z-50"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-bold text-sm">Mot de passe mis à jour avec succès</span>
        </motion.div>
      )}
    </div>
  )
}

function NotificationToggle({ icon: Icon, title, description, defaultEnabled }: {
  icon: any
  title: string
  description: string
  defaultEnabled: boolean
}) {
  const [enabled, setEnabled] = useState(defaultEnabled)

  return (
    <div className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-sm text-zinc-900 dark:text-white">{title}</p>
          <p className="text-[10px] text-zinc-400 font-bold">{description}</p>
        </div>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={cn(
          "w-14 h-8 rounded-full relative transition-all",
          enabled ? "bg-blue-600" : "bg-zinc-200 dark:bg-zinc-700"
        )}
      >
        <div className={cn(
          "absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all",
          enabled ? "left-7" : "left-1"
        )} />
      </button>
    </div>
  )
}
