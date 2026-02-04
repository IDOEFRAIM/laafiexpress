'use client'

import { motion } from 'framer-motion'
import { Ship, Plane, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const PricingSection = () => {
  return (
    <section id="pricing" className="py-32 bg-white relative overflow-hidden">
      {/* Subtiles lignes de structure (Style architectural) */}
      <div className="absolute inset-0 flex justify-around opacity-[0.03] pointer-events-none">
        <div className="w-px h-full bg-black" />
        <div className="w-px h-full bg-black" />
        <div className="w-px h-full bg-black" />
        <div className="w-px h-full bg-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-blue-600 font-bold tracking-[0.4em] uppercase text-xs block mb-4"
            >
              Standard de Transport 2026
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-light text-slate-900 leading-[0.9] tracking-tighter">
              L'EXCELLENCE <br />
              <span className="font-black text-blue-600">SANS COMPROMIS.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-lg max-w-sm font-light leading-relaxed border-l border-slate-200 pl-8">
            Une tarification rigoureuse pour une logistique d'élite. Pas de frais cachés, uniquement la performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
          
          {/* Fret Maritime - Minimalist White */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-16 hover:bg-slate-50 transition-colors duration-700"
          >
            <div className="flex justify-between items-start mb-16">
              <div>
                <div className="w-12 h-px bg-blue-600 mb-6" />
                <h3 className="text-3xl font-bold text-slate-900 tracking-tighter uppercase">Maritime</h3>
                <p className="text-slate-400 text-[10px] font-mono mt-2 tracking-widest uppercase">Global Ocean Freight</p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-light text-slate-900 tracking-tighter">SUR DEVIS</span>
                <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Minimum 0.2 CBM</span>
              </div>
            </div>

            <div className="grid gap-y-6 mb-16">
              {[
                { label: "Transit", value: "90 Jours Moyenne" },
                { label: "Mise à jour", value: "Hebdomadaire (Samedi)" },
                { label: "Paiement", value: "J-5 Avant Expédition" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <span className="text-slate-500 text-xs uppercase tracking-widest">{item.label}</span>
                  <span className="text-slate-900 font-bold text-sm">{item.value}</span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-slate-900 hover:bg-blue-700 text-white rounded-none h-16 uppercase font-bold tracking-[0.2em] text-xs transition-all duration-500">
              Demander un devis Cargo
            </Button>
          </motion.div>

          {/* Fret Aérien - Minimalist Red Focus */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#fcfcfc] p-10 md:p-16 relative overflow-hidden group"
          >
            {/* Accent discret */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors" />
            
            <div className="flex justify-between items-start mb-16">
              <div>
                <div className="w-12 h-px bg-blue-600 mb-6" />
                <h3 className="text-3xl font-bold text-slate-900 tracking-tighter uppercase">Aérien</h3>
                <p className="text-slate-400 text-[10px] font-mono mt-2 tracking-widest uppercase">Premium Air Freight</p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-light text-slate-900 tracking-tighter">STANDARD</span>
                <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Minimum 1 KG</span>
              </div>
            </div>

            <div className="grid gap-y-6 mb-16">
              {[
                { label: "Livraison", value: "14 Jours Maximum" },
                { label: "Service", value: "MCO (Simple & Sécurisé)" },
                { label: "Paiement", value: "J-3 Avant Expédition" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <span className="text-slate-500 text-xs uppercase tracking-widest">{item.label}</span>
                  <span className="text-slate-900 font-bold text-sm">{item.value}</span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-none h-16 uppercase font-bold tracking-[0.2em] text-xs shadow-lg shadow-blue-600/10 transition-all">
              Calculer mon expédition
            </Button>
          </motion.div>
        </div>

        {/* Footer de section clean */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-100 pt-12">
          <div className="flex items-center gap-6">
            <div className="bg-blue-50 p-3">
              <AlertCircle className="text-blue-600 w-5 h-5" />
            </div>
            <p className="text-slate-400 text-xs uppercase tracking-widest leading-loose max-w-md">
              La rigueur financière garantit la fluidité logistique. Tout retard de paiement impacte la date d'envoi.
            </p>
          </div>
          <Link href="https://wa.me/+22601479800" className="group flex items-center gap-4 text-slate-900 font-black text-xs uppercase tracking-[0.3em] hover:text-blue-600 transition-colors">
            Nous contacter
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PricingSection