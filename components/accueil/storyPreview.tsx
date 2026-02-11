'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Scan, Activity } from 'lucide-react'
import Link from 'next/link'

const StoryPreview = () => {
  return (
    <section className="py-40 bg-white relative overflow-hidden">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="text-blue-600 font-black tracking-[0.5em] uppercase text-[10px]">
               LOGISTIQUE 2026
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <h2 className="lg:col-span-8 text-6xl md:text-[110px] font-black leading-[0.8] tracking-[-0.05em] uppercase text-slate-900">
              NOUS,<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-400 italic font-light tracking-tight">EN IMAGES.</span>
            </h2>
            <div className="lg:col-span-4 border-l-4 border-blue-600 pl-8">
              <p className="text-slate-500 text-[12px] font-bold uppercase tracking-widest leading-relaxed mb-8">
                Suivez votre marchandise en direct, du port d'embarquement jusqu'à votre porte.
              </p>
              <Link href="/team" className="group flex items-center gap-6">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 group-hover:text-blue-600 transition-colors">Voir d'autres images</span>
                <div className="w-16 h-px bg-slate-200 group-hover:w-24 group-hover:bg-blue-600 transition-all duration-500" />
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform group-hover:text-blue-600" />
              </Link>
            </div>
          </div>
        </div>

        {/* --- COMPOSITION VISUELLE --- */}
        <div className="grid lg:grid-cols-12 gap-6 h-[600px]">
          
          {/* Bloc Vidéo Principal */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="lg:col-span-8 relative group rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-900"
          >
            <video 
              src="/chinois_chargage.mp4"
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all duration-1000"
              autoPlay muted loop playsInline
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
            
            {/* Scanner Laser Animé */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-400/50 shadow-[0_0_20px_#60a5fa] animate-[scan_5s_ease-in-out_infinite] z-20" />

            <div className="absolute top-10 left-10 z-30 flex items-center gap-4">
               <div className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-2">
                  <Activity size={12} className="animate-pulse" /> Live
               </div>
               <span className="text-white text-[10px] font-mono tracking-widest bg-slate-900/40 backdrop-blur-md px-3 py-1 rounded-md">Port de GUANGZHOU</span>
            </div>

            <div className="absolute bottom-10 left-10 z-30">
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Chargement en cours</h3>
            </div>
          </motion.div>
{/* Bloc Image Logo/Flotte (En couleur) */}
<div className="lg:col-span-4">
  <div className="relative group h-full rounded-[2rem] overflow-hidden border border-slate-100 bg-white shadow-xl">
    
    {/* REMPLACEMENT DE LA DIV BG-URL PAR UNE IMG */}
    <img 
      src="/laaficargo.jpeg" 
      alt="Notre Flotte"
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
    />
    
    {/* Overlay léger pour le style */}
    <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors" />
    
    <div className="absolute top-8 right-8">
      <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-slate-100 shadow-xl">
        <Scan size={20} className="text-blue-600" />
      </div>
    </div>
    
    <div className="absolute bottom-10 left-10 right-10">
      <span className="inline-block px-4 py-2 bg-white text-[10px] font-black uppercase tracking-widest text-slate-900 rounded-full shadow-lg mb-4">
        Notre Flotte
      </span>
      <p className="text-white font-bold text-lg leading-tight drop-shadow-md">
        L'excellence logistique entre l'Asie et l'Afrique.
      </p>
    </div>
  </div>
</div>

        </div>

        {/* --- STATS FOOTER 
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center opacity-60 gap-8">
            <div className="flex gap-16">
               <div>
                  <p className="text-[8px] font-mono uppercase italic mb-2 text-slate-400">_Daily_Assets</p>
                  <p className="text-sm font-black text-slate-900 tracking-widest">+50 GB / DAY</p>
               </div>
               <div>
                  <p className="text-[8px] font-mono uppercase italic mb-2 text-slate-400">_Global_Reach</p>
                  <p className="text-sm font-black text-slate-900 tracking-widest">ASIA-AFRICA</p>
               </div>
            </div>
            <div className="text-[9px] font-mono uppercase tracking-[0.4em] text-slate-400 border px-6 py-2 rounded-full border-slate-100">
              Visual_Archive_Ref: LAAFI-2026
            </div>
        </div>--- */}
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: 100%; opacity: 1; }
        }
      `}</style>
    </section>
  )
}

export default StoryPreview