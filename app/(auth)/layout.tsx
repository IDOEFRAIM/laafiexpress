import React from "react";
import Link from "next/link";
import { Globe2, Shield, Activity, LockKeyhole } from "lucide-react";
import AuthTabs from "@/components/auth-tables"; // On va créer ce petit composant

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex bg-slate-50">
      {/* SECTION GAUCHE : Branding Industriel */}
      <div className="hidden lg:flex w-[40%] relative flex-col justify-between p-12 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5" 
             style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        
        <div className="z-10 flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 flex items-center justify-center rounded-lg shadow-lg">
            <Globe2 size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white uppercase">Laafi Cargo</span>
            <span className="text-[10px] text-blue-400 font-bold tracking-[0.2em]">Logistics OS</span>
          </div>
        </div>

        <div className="z-10 space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-[1.1]">
            L'excellence <br /> 
            <span className="text-slate-400 font-light italic">sans compromis.</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium border-l-2 border-blue-600 pl-4">
            Terminal sécurisé pour la gestion des flux internationaux Guangzhou - Ouagadougou.
          </p>
        </div>

        <div className="z-10 flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-2 rounded border border-white/10">
            <Activity size={12} className="text-emerald-500" /> System Stable
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-2 rounded border border-white/10">
            <Shield size={12} className="text-blue-500" /> Verified Node
          </div>
        </div>
      </div>

      {/* SECTION DROITE : Le Terminal de saisie */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <div className="w-full max-w-[420px] space-y-8">
          
          {/* HEADER FIXE (Dans le Layout) */}
          <div className="space-y-6">
            <AuthTabs /> {/* Composant pour switcher entre Login et Register */}
            
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Accès Terminal</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.15em]">Identification requise pour session sécurisée</p>
            </div>
          </div>

          {/* CONTENU VARIABLE (Login ou Register) */}
          <main className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </main>

          {/* FOOTER FIXE */}
          <div className="pt-6 border-t border-slate-200 flex items-center gap-2 text-slate-400">
            <LockKeyhole size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Accès protégé par cryptage SSL/TLS</span>
          </div>
        </div>
      </div>
    </div>
  );
}