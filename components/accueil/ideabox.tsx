'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Heart, MessageSquare, Sparkles, ChevronRight, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'

const IdeaBox = () => {
  const [idea, setIdea] = useState('')
  const [category, setCategory] = useState('Logistique')

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault()
    const phoneNumber = "+22666663651"
    const text = `*UNE IDÉE POUR LAAFI CARGO !*\n\n` +
                 `• *Sujet:* ${category}\n` +
                 `• *L'idée géniale:* ${idea}`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* --- LA GRILLE : Présente mais plus discrète (Slate-50) --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* --- HEADER : Plus invitant --- */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <Sparkles size={18} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Espace Co-Création</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tighter">
              UNE IDÉE ? <br />
              <span className="text-blue-600 underline decoration-slate-900 decoration-4 underline-offset-8">PARLONS-EN.</span>
            </h2>
          </div>
          <p className="max-w-[300px] text-sm font-medium text-slate-500 leading-relaxed italic md:text-right border-r-4 border-blue-600 pr-6">
            "Chez Laafi, votre avis n'est pas une statistique, c'est notre moteur pour nous améliorer chaque jour."
          </p>
        </div>

        {/* --- LE BLOC : Toujours pro, mais plus accueillant --- */}
        <div className="grid lg:grid-cols-12 bg-white border-2 border-slate-900 rounded-lg overflow-hidden shadow-[15px_15px_0px_0px_rgba(0,0,0,0.05)]">
          
          {/* PANEL GAUCHE : ON CHOISIT LE SUJET */}
          <div className="lg:col-span-4 border-r-2 border-slate-900 p-10 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-10">
              <div className="flex items-center gap-2">
                <Smile size={16} className="text-blue-600" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">On vous écoute sur :</span>
              </div>
              
              <div className="flex flex-col gap-5">
                {['La Logistique', 'Le Digital', 'Le Service Client', 'Nos Bureaux', 'Autre chose'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="flex items-center group text-left outline-none"
                  >
                    <div className={`h-3 rounded-full transition-all duration-300 mr-4 ${
                      category === cat ? 'w-3 bg-blue-600' : 'w-3 bg-slate-200 group-hover:bg-slate-400'
                    }`} />
                    <span className={`text-lg font-bold transition-all ${
                      category === cat ? 'text-slate-900 scale-105' : 'text-slate-300 group-hover:text-slate-500'
                    }`}>
                      {cat}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-4 pt-12 border-t border-slate-200">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Heart size={18} className="text-blue-600 fill-blue-600" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-tight">
                Chaque idée est lue <br /> avec attention par l'équipe.
              </p>
            </div>
          </div>

          {/* PANEL DROIT : ON ÉCRIT SON MESSAGE */}
          <div className="lg:col-span-8 p-10 md:p-16">
            <div className="flex items-center gap-2 mb-8">
              <MessageSquare size={16} className="text-blue-600" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partagez votre pensée</span>
            </div>
            
            <form onSubmit={handleSubmission} className="space-y-12">
              <div className="relative group">
                <textarea
                  required
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Écrivez ici ce que vous aimeriez voir changer ou s'améliorer..."
                  className="w-full bg-transparent border-none py-4 text-xl md:text-2xl font-medium text-slate-800 outline-none placeholder:text-slate-200 min-h-[180px] resize-none"
                />
                <div className="h-[2px] w-full bg-slate-100 group-focus-within:bg-blue-600 transition-colors" />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg">
                    <Send size={20} className="text-white -rotate-12" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-tight text-slate-400">
                    Envoi instantané <br /> vers notre WhatsApp
                  </span>
                </div>

                <Button 
                  type="submit"
                  className="w-full md:w-auto h-16 px-10 bg-blue-600 text-white rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 flex items-center gap-4 group"
                >
                  PARTAGER MON IDÉE <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
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