'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Fingerprint, ShieldCheck, Quote } from 'lucide-react'

const LeadershipSection = () => {
  return (
    <section className="py-40 bg-white relative overflow-hidden">
      {/* Background : Trame de points très discrète (Style Papier Ingénieur) */}
      <div className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          
          {/* --- PARTIE IMAGE (L'ASPECT ARCHITECTURAL) --- */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 border-[1px] border-slate-900 p-4 bg-white">
              {/* Remplacer par la vraie image du CEO */}
              <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 uppercase font-black text-[10px] tracking-widest">
                  [ Portrait_CEO_Visual ]
                </div>
                {/* Overlay technique */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/80 to-transparent">
                  <div className="flex items-center gap-3">
                    <Fingerprint size={16} className="text-blue-600" />
                    <span className="text-[9px] font-mono text-slate-900 uppercase tracking-widest">Biometric_Verify: OK</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Éléments de design flottants (Architectural) */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-blue-600 opacity-20 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 text-[120px] font-black text-slate-50 select-none -z-10 leading-none">
              CEO
            </div>
          </div>

          {/* --- PARTIE TEXTE (L'ÉLITISME) --- */}
          <div className="lg:col-span-7">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-blue-600" />
                <span className="text-blue-600 font-black tracking-[0.5em] uppercase text-[10px]">Strategic Leadership</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6">
                L'ENGAGEMENT <br />
                <span className="text-slate-400 font-light italic">DU DIRECTOIRE.</span>
              </h2>

              <div className="relative mb-12">
                <Quote className="absolute -left-8 -top-4 w-12 h-12 text-blue-50 opacity-10" />
                <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed italic">
                  "Notre mission dépasse le simple transport. Nous bâtissons l'infrastructure invisible qui soutient la croissance entre la Chine et le Burkina Faso."
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">NOM DU CEO</h3>
                  <p className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mt-1 italic">Fondateur & Chief Executive Officer</p>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-slate-900" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expertise</span>
                    </div>
                    <p className="text-xs font-bold uppercase text-slate-900 leading-tight">Supply Chain Management & International Trade</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award size={14} className="text-slate-900" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vision</span>
                    </div>
                    <p className="text-xs font-bold uppercase text-slate-900 leading-tight">Digitalisation des flux Chine-Afrique</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Pied de section : Sceau de confiance */}
        <div className="mt-32 flex justify-center">
            <div className="px-10 py-6 border border-slate-100 bg-slate-50/50 flex items-center gap-8 group hover:border-blue-600 transition-all cursor-default">
                <div className="text-right">
                    <p className="text-[8px] font-mono text-slate-300 uppercase tracking-widest">Authority_Level</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Full Executive Control</p>
                </div>
                <div className="w-[1px] h-10 bg-slate-200" />
                <div>
                    <p className="text-[8px] font-mono text-slate-300 uppercase tracking-widest">Verification_Status</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Verified_Official</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default LeadershipSection