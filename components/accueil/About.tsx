'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Anchor, Globe, Briefcase } from 'lucide-react'

const AboutSection = () => {
  return (
    <section id="about" className="py-40 bg-white relative overflow-hidden">
      {/* GRID DE CONSTRUCTION SUISSE (Lignes de 0.5px) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER : IDENTITÉ MONUMENTALE --- */}
        <div className="grid lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">Corporate Identity</span>
              <div className="h-px w-24 bg-slate-200" />
            </motion.div>
            
            <h2 className="text-6xl md:text-[110px] font-black leading-[0.8] tracking-tighter uppercase text-slate-900 mb-12">
              L'EXCELLENCE <br />
              SANS FRONTIÈRE.
            </h2>
            
            <p className="text-xl md:text-3xl font-light text-slate-500 max-w-2xl leading-tight">
              LAAFI CARGO INTERNATIONAL est le trait d'union stratégique entre les hubs industriels de <span className="text-slate-900 font-bold uppercase">Chine</span> et la dynamique économique du <span className="text-slate-900 font-bold uppercase">Burkina Faso</span>.
            </p>
          </div>

          {/* Badge de localisation technique */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="bg-slate-50 border border-slate-200 p-8">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-4">// Siège Opérationnel</span>
              <p className="text-sm font-black uppercase tracking-tighter mb-2 text-slate-900">Ouagadougou, Samandin</p>
              <p className="text-xs font-medium text-slate-500 uppercase leading-relaxed">
                Face Pharmacie WATI <br />
                01 BP 4833 Ouaga
              </p>
            </div>
          </div>
        </div>

        {/* --- GRILLE TECHNIQUE : INFORMATIONS LÉGALES & CERTIFICATIONS --- */}
        <div className="grid md:grid-cols-3 border border-slate-900 overflow-hidden bg-white">
          
          {/* Mission */}
          <div className="p-12 border-b md:border-b-0 md:border-r border-slate-900 group hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start mb-12">
              <Globe className="w-6 h-6 text-slate-900" />
              <span className="text-[10px] font-mono text-slate-300">MOD_01</span>
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-blue-600">Notre Mission</h3>
            <p className="text-sm font-bold uppercase leading-relaxed text-slate-600">
              Faciliter l'importation de marchandises avec une précision chirurgicale, garantissant fluidité et sécurité sur tout le corridor Chine-Burkina.
            </p>
          </div>

          {/* Registre Technique (RCCM / IFU) */}
          <div className="p-12 border-b md:border-b-0 md:border-r border-slate-900 bg-slate-50/50">
            <div className="flex justify-between items-start mb-12">
              <Briefcase className="w-6 h-6 text-slate-900" />
              <span className="text-[10px] font-mono text-slate-300">MOD_02</span>
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-blue-600">Registre d'Entreprise</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Identifiant Fiscal (IFU)</p>
                <p className="text-lg font-black tracking-tighter uppercase text-slate-900">002609956C</p>
              </div>
              <div>
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">RCCM</p>
                <p className="text-lg font-black tracking-tighter uppercase text-slate-900">BFOUA 01-2025-B12-0257</p>
              </div>
            </div>
          </div>

          {/* Division Fiscale / Compliance */}
          <div className="p-12 group hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start mb-12">
              <ShieldCheck className="w-6 h-6 text-slate-900" />
              <span className="text-[10px] font-mono text-slate-300">MOD_03</span>
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-blue-600">Autorité & Conformité</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Division Fiscale</p>
                <p className="text-lg font-black tracking-tighter uppercase text-slate-900">DCI</p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-900">Structure Certifiée</span>
                 </div>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER DE SECTION : CHIFFRES CLÉS OU MENTION LÉGALE */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 border-b border-slate-100 pb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 italic">Established in 2025 // Global Logistics Standard</span>
          <div className="flex gap-8">
             <div className="text-center">
                <p className="text-[9px] font-mono text-slate-300 mb-1">Hub Principal</p>
                <p className="text-xs font-black uppercase tracking-widest">Guangzhou, CN</p>
             </div>
             <div className="text-center">
                <p className="text-[9px] font-mono text-slate-300 mb-1">Terminal Arrivée</p>
                <p className="text-xs font-black uppercase tracking-widest">Ouagadougou, BF</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection