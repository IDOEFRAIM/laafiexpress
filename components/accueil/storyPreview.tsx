'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Zap, Scan, Activity, Globe } from 'lucide-react'
import Link from 'next/link'

const StoryPreview = () => {
  return (
    <section className="py-40 bg-white relative overflow-hidden">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER : IMPACT MAXIMUM --- */}
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
              Live_Field_Operations // 2026
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <h2 className="lg:col-span-8 text-6xl md:text-[110px] font-black leading-[0.8] tracking-[-0.05em] uppercase text-slate-900">
              STORY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400 italic font-light tracking-tight">IN MOTION.</span>
            </h2>
            <div className="lg:col-span-4 border-l-4 border-blue-600 pl-8">
              <p className="text-slate-500 text-[12px] font-bold uppercase tracking-widest leading-relaxed mb-8">
                Visualisez la puissance de nos flux en temps réel. De Guangzhou à Ouagadougou, l'excellence ne s'arrête jamais.
              </p>
              <Link href="/team" className="group flex items-center gap-6">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 group-hover:text-blue-600 transition-colors">Entrer dans l'archive</span>
                <div className="w-16 h-px bg-slate-200 group-hover:w-24 group-hover:bg-blue-600 transition-all duration-500" />
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform group-hover:text-blue-600" />
              </Link>
            </div>
          </div>
        </div>

        {/* --- COMPOSITION VISUELLE : L'ACTION EN DIRECT --- */}
        <div className="grid lg:grid-cols-12 gap-6 h-[750px]">
          
          {/* Bloc Principal - La Vidéo Hero */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="lg:col-span-8 relative group rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-900"
          >
            <video 
              src="/chinois_chargage.mp4"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              autoPlay muted loop playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
            
            {/* Scanner Laser Animé */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400/50 shadow-[0_0_20px_#60a5fa] animate-[scan_5s_ease-in-out_infinite] z-20" />

            <div className="absolute top-10 left-10 z-30 flex items-center gap-4">
               <div className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-2">
                  <Activity size={12} className="animate-pulse" /> Live_Feed
               </div>
               <span className="text-white/70 text-[10px] font-mono tracking-widest">LOC: GUANGZHOU_PORT</span>
            </div>

            <div className="absolute bottom-10 left-10 z-30">
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Chargement Prioritaire</h3>
               <p className="text-blue-400 font-mono text-[10px] uppercase tracking-widest">Asset_ID: LFI-2026-ZH</p>
            </div>
          </motion.div>

          {/* Blocs Secondaires - Équipement & Tech */}
          <div className="lg:col-span-4 grid grid-rows-2 gap-6">
            
            {/* Frame Image : La Flotte */}
            <div className="relative group rounded-[2rem] overflow-hidden border border-slate-100 bg-white">
               <div className="absolute inset-0 bg-[url('/laaficargo.jpeg')] bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
               <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors" />
               <div className="absolute top-6 right-6">
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-slate-100 shadow-xl">
                     <Scan size={18} className="text-blue-600" />
                  </div>
               </div>
               <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1 bg-white text-[8px] font-black uppercase tracking-widest text-slate-900 rounded-full shadow-lg">Fleet_Efficiency</span>
               </div>
            </div>

            {/* Frame Tech : Données */}
            <div className="bg-slate-900 rounded-[2rem] p-10 flex flex-col justify-between relative overflow-hidden group">
               <Globe className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 group-hover:text-blue-600/10 transition-colors duration-700" />
               
               <div className="relative z-10">
                  <div className="w-12 h-1 bg-blue-600 mb-8 group-hover:w-20 transition-all duration-500" />
                  <p className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                    FLUX <br /> <span className="text-blue-500 italic font-light">OPTIMISÉ.</span>
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                    Surveillance visuelle continue de chaque corridor logistique entre l'Asie et l'Afrique.
                  </p>
               </div>

               <div className="relative z-10 flex justify-between items-end">
                  <div className="flex flex-col">
                     <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Status</span>
                     <span className="text-[10px] font-black text-blue-400 uppercase">Synced_24/7</span>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                    <Play size={14} fill="currentColor" />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* --- STATS FOOTER --- */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center opacity-60 gap-8">
           <div className="flex gap-16">
              <div>
                 <p className="text-[8px] font-mono uppercase italic mb-2 text-slate-400">_Daily_Assets</p>
                 <p className="text-sm font-black text-slate-900 tracking-widest">+50 GB / DAY</p>
              </div>
              <div>
                 <p className="text-[8px] font-mono uppercase italic mb-2 text-slate-400">_Core_Safety</p>
                 <p className="text-sm font-black text-slate-900 tracking-widest">AES-256 BIT</p>
              </div>
           </div>
           <div className="text-[9px] font-mono uppercase tracking-[0.4em] text-slate-400 border px-6 py-2 rounded-full border-slate-100">
             Logistics_Intelligence_Ref: LAAFI-26-PIC
           </div>
        </div>
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