'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Ship, Plane, ArrowUpRight, Percent, Zap, Anchor } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PriceCard = ({ title, current, old, duration, details, isPromo }: any) => (
  <div className={`p-8 border-b border-r border-slate-900 flex flex-col justify-between group transition-colors ${isPromo ? 'bg-slate-50' : 'bg-white'}`}>
    <div className="flex justify-between items-start mb-8">
      <div>
        <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">{title}</h3>
      </div>
      {isPromo && (
        <div className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest animate-pulse">
          Promotion
        </div>
      )}
    </div>

    <div className="mb-8">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-4xl font-black tracking-tighter text-slate-900">{current} <small className="text-sm">FCFA</small></span>
        {old && (
          <span className="text-lg font-bold text-slate-300 line-through decoration-blue-600 decoration-2 tracking-tighter">
            {old} F
          </span>
        )}
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mt-2 italic">{duration}</p>
    </div>

    <div className="space-y-3 pt-6 border-t border-slate-100">
       {details.map((detail: string, i: number) => (
         <div key={i} className="flex items-center gap-2">
            <div className="w-1 h-1 bg-slate-900" />
            <span className="text-[10px] font-bold uppercase tracking-tight text-slate-500">{detail}</span>
         </div>
       ))}
    </div>
  </div>
)

const PricingSection = () => {
  return (
    <section id="pricing" className="py-40 bg-white relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" 
        style={{ 
          backgroundImage: `linear-gradient(#000 0.5px, transparent 0.5px), linear-gradient(90deg, #000 0.5px, transparent 0.5px)`,
          backgroundSize: '60px 60px'
        }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER ARCHITECTURAL */}
        <div className="grid lg:grid-cols-12 gap-12 mb-24 border-b-2 border-slate-900 pb-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-6 text-blue-600">
              <Percent size={18} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Prix // 2026 Edition</span>
            </div>
            <h2 className="text-6xl md:text-[100px] font-black leading-[0.8] tracking-tighter uppercase text-slate-900">
              GRILLES <br />
              <span className="text-blue-600">TARIFAIRES.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed italic border-l-4 border-blue-600 pl-6">
              Optimisation des flux financiers pour une logistique d'élite. Tarifications indexées sur la performance globale.
            </p>
          </div>
        </div>

        {/* SECTION 1: PROMOTIONNELLE (TACTICAL DIVISION) */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
             <div className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em]">
               Offres Promotionnelles(2026)
             </div>
             <div className="h-px flex-grow bg-slate-900" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-900 shadow-[20px_20px_0px_0px_rgba(37,99,235,0.05)]">
            <PriceCard 
              isPromo title="LTA Air" current="11 700" old="12 500" 
              duration="Validité 30 Jours" 
              details={["Fret Premium", "Dédouanement Inclus", "Tracking Actif"]} 
            />
            <PriceCard 
              isPromo title="MCO Regular" current="8 500" old="9 500" 
              duration="14 à 21 Jours" 
              details={["Corridor Hebdomadaire", "Sécurisation Cargo", "Point à Point"]} 
            />
            <PriceCard 
              isPromo title="Express Bag/Box" current="14 000" 
              duration="Conditionné (5kg Max)" 
              details={["Traitement Prioritaire", "Bag ou Box requis", "Sortie J+1"]} 
            />
            <PriceCard 
              isPromo title="Expression Sea" current="226 500" old="240 000" 
              duration="Saison New Year" 
              details={["Groupage Maritime", "CBM Optimisé", "Assurance Transit"]} 
            />
          </div>
        </div>

        {/* SECTION 2: STANDARD (BASE DIVISION) */}
<div>
          {/* Label de section avec ligne de rappel */}
          <div className="flex items-center gap-6 mb-12">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-slate-900 rotate-45" />
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">
                  Protocoles Standards(2026)
                </span>
             </div>
             <div className="h-px flex-grow bg-slate-200" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 border-2 border-slate-900 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.02)]">
            
            {/* LTA - Version Épurée */}
            <div className="p-10 border-r border-b border-slate-200 lg:border-b-0 hover:bg-slate-50 transition-colors group">
              <div className="flex justify-between items-start mb-10">
              </div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Aérien LTA</h4>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">12 500 <span className="text-sm font-bold tracking-normal">FCFA</span></p>
              <div className="mt-6 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-500" />
            </div>

            {/* MCO - Version Épurée */}
            <div className="p-10 border-r border-b border-slate-200 lg:border-b-0 hover:bg-slate-50 transition-colors group">
              <div className="flex justify-between items-start mb-10">
              </div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Aérien MCO</h4>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">9 500 <span className="text-sm font-bold tracking-normal">FCFA</span></p>
              <div className="mt-6 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-500" />
            </div>

            {/* EXPRESS - Version Épurée */}
            <div className="p-10 border-r border-b border-slate-200 lg:border-b-0 hover:bg-slate-50 transition-colors group">
              <div className="flex justify-between items-start mb-10">
              </div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Service Express</h4>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">14 000 <span className="text-sm font-bold tracking-normal">FCFA</span></p>
              <div className="mt-6 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-500" />
            </div>

            {/* MARITIME - Le "Master Block" en Gris Industriel (Plus Élitiste que le noir) */}
            <div className="p-10 bg-slate-50 relative overflow-hidden group">
              {/* Filigrane discret en fond */}
              <div className="absolute -bottom-4 -right-4 text-slate-100 font-black text-7xl select-none pointer-events-none group-hover:text-blue-50 transition-colors">
                CBM
              </div>
              
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-blue-600" />
                </div>
              </div>
              
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4 relative z-10 italic">Expédition Maritime (CBM)</h4>
              <p className="text-3xl font-black text-slate-900 tracking-tighter relative z-10">2 500 000 <span className="text-sm font-bold tracking-normal">FCFA</span></p>
              
              <div className="mt-8 pt-4 border-t border-slate-200 relative z-10">
                 <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                   Tarification par unité de volume standard <br /> 
                   Indexée sur le marché international
                 </p>
              </div>
            </div>

          </div>
        </div>

       

      </div>
    </section>
  )
}

export default PricingSection