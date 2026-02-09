'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Send, Plus, Fingerprint, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const IdeaBox = () => {
  const [idea, setIdea] = useState('')
  const [category, setCategory] = useState('FLUX')

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault()
    const phoneNumber = "22666663651"
    const text = `*DOSSIER PROPOSITION - LAAFI CARGO*\n\n` +
                 `• *Domaine:* ${category}\n` +
                 `• *Idee:* ${idea}`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* GRID SVG ARCHITECTURAL : Lignes de 0.5px couleur Slate-100 */}
      <div className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #f1f5f9 1px, transparent 1px),
            linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">Innovation Portal</span>
              <div className="h-px w-20 bg-slate-200" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">
              VOTRE VISION <br />
              <span className="font-light text-slate-400 italic">NOTRE ÉCHELLE.</span>
            </h2>
          </div>
          <p className="max-w-[280px] text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed border-l-2 border-slate-900 pl-6">
            L'excellence opérationnelle naît de la collaboration. Soumettez vos axes d'optimisation pour le corridor Chine-Afrique.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 bg-white border border-slate-200">
          
          {/* PANEL GAUCHE : SÉLECTION DE CATÉGORIE */}
          <div className="lg:col-span-4 border-r border-slate-200 p-10 md:p-16 flex flex-col justify-between">
            <div className="space-y-12">
              <span className="text-[9px] font-mono text-slate-300 uppercase tracking-[0.3em]">01:Selectionez l'idee</span>
              <div className="flex flex-col gap-4">
                {['Logistique', 'DIGITAL', 'DOUANE', 'BUREAU','Autres'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="flex items-center justify-between group text-left"
                  >
                    <span className={`text-xl font-black tracking-tighter transition-all ${
                      category === cat ? 'text-blue-600 translate-x-2' : 'text-slate-300 group-hover:text-slate-900'
                    }`}>
                      {cat}
                    </span>
                    {category === cat && <div className="h-1 w-8 bg-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block pt-20">
              <Fingerprint className="w-10 h-10 text-slate-100 mb-4" />
              <p className="text-[8px] font-mono text-slate-300 uppercase tracking-widest">
                System Verification: Secure_Intake_Active
              </p>
            </div>
          </div>

          {/* PANEL DROIT : RÉDACTION */}
          <div className="lg:col-span-8 p-10 md:p-16 bg-[#fcfcfc]">
            <span className="text-[9px] font-mono text-slate-300 uppercase tracking-[0.3em] block mb-12">02:Rédiger la proposition</span>
            
            <form onSubmit={handleSubmission} className="space-y-16">
              <div className="relative group">
                <textarea
                  required
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="DÉTAILLEZ VOTRE CONCEPT..."
                  className="w-full bg-transparent border-b border-slate-200 py-8 text-2xl font-bold uppercase tracking-tighter outline-none focus:border-slate-900 transition-all placeholder:text-slate-100 min-h-[150px] resize-none"
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 transition-all group-focus-within:w-full" />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 border border-slate-900 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-slate-900" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest leading-tight">
                    Transmission directe <br /> au directoire technique
                  </span>
                </div>

                <Button 
                  type="submit"
                  className="w-full md:w-auto h-20 px-12 bg-slate-900 text-white rounded-none font-black uppercase text-[11px] tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center gap-6 group"
                >
                  SOUMETTRE LE DOSSIER <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default IdeaBox