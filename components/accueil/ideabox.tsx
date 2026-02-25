'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Heart, MessageSquare, Sparkles, ChevronRight, Smile, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'

const IdeaBox = () => {
  const [idea, setIdea] = useState('')
  const [category, setCategory] = useState('La Logistique')
  const [status, setStatus] = useState('idle') 

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {

      const response = await axios.post('/api/email', {
        subject: `Nouvelle idée : ${category}`,
        category: category,
        message: idea,
      })

      if (response.status === 200) {
        setStatus('success')
        setIdea('')

        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      console.error("Erreur d'envoi:", error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* --- GRILLE DE FOND --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
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
          <p className="max-w-75 text-sm font-medium text-slate-500 leading-relaxed italic md:text-right border-r-4 border-blue-600 pr-6">
            "Chez Laafi, votre avis n'est pas une statistique, c'est notre moteur pour nous améliorer."
          </p>
        </div>

        {/* --- FORMULAIRE PRINCIPAL --- */}
        <div className="grid lg:grid-cols-12 bg-white border-2 border-slate-900 rounded-lg overflow-hidden shadow-[20px_20px_0px_0px_rgba(37,99,235,0.1)]">
          
          {/* PANEL GAUCHE */}
          <div className="lg:col-span-4 border-r-2 border-slate-900 p-10 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-10">
              <div className="flex items-center gap-2">
                <Smile size={16} className="text-blue-600" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">On vous écoute sur :</span>
              </div>
              
              <div className="flex flex-col gap-5">
                {['La Logistique', 'Le Digital', 'Le Service Client', 'Nos Bureaux', 'Autre'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className="flex items-center group text-left outline-none"
                  >
                    <motion.div 
                      animate={{ width: category === cat ? 12 : 6 }}
                      className={`h-3 rounded-full mr-4 ${category === cat ? 'bg-blue-600' : 'bg-slate-200'}`} 
                    />
                    <span className={`text-lg font-bold transition-all ${
                      category === cat ? 'text-slate-900 translate-x-1' : 'text-slate-300 group-hover:text-slate-500'
                    }`}>
                      {cat}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-4 pt-12 border-t border-slate-200">
              <Heart size={18} className="text-blue-600 fill-blue-600" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-tight">
                Chaque message arrive <br /> directement chez nous.
              </p>
            </div>
          </div>

          {/* PANEL DROIT */}
          <div className="lg:col-span-8 p-10 md:p-16 relative">
            <div className="flex items-center gap-2 mb-8">
              <MessageSquare size={16} className="text-blue-600" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Votre message</span>
            </div>
            
            <form onSubmit={handleSubmission} className="space-y-12">
              <div className="relative group">
                <textarea
                  required
                  disabled={status === 'loading' || status === 'success'}
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Dites-nous tout..."
                  className="w-full bg-transparent border-none py-4 text-xl md:text-2xl font-medium text-slate-800 outline-none placeholder:text-slate-200 min-h-[180px] resize-none disabled:opacity-50"
                />

                <div className={`h-0.5 w-full transition-colors ${status === 'success' ? 'bg-green-500' : 'bg-slate-100 group-focus-within:bg-blue-600'}`} />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg">
                    {status === 'success' ? (
                      <CheckCircle2 size={20} className="text-green-400" />
                    ) : (
                      <Send size={20} className={`text-white transition-transform ${status === 'loading' ? 'animate-pulse' : '-rotate-12'}`} />
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-tight text-slate-400">
                    {status === 'success' ? "Reçu 5 sur 5 !" : "Traitement sécurisé \n via nos services"}
                  </span>
                </div>

                <Button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success' || !idea}
                  className={`w-full md:w-auto h-16 px-10 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] transition-all flex items-center gap-4 group shadow-xl
                    ${status === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-slate-900'}
                  `}
                >
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : status === 'success' ? (
                    "MERCI POUR L'IDÉE !"
                  ) : (
                    <>PARTAGER MON IDÉE <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </Button>
              </div>
            </form>

            {/* MESSAGE D'ERREUR */}
            {status === 'error' && (
              <p className="absolute bottom-4 left-16 text-red-500 text-[10px] font-bold uppercase">
                Erreur lors de l'envoi. Réessayez plus tard.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default IdeaBox