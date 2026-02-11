'use client'

import React, { useState } from 'react'
import { ArrowUpRight,Zap, MessageCircle, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Fret Aérien',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault()
    const phoneNumber = "+22666663651" 
    const text = `*BONJOUR LAAFI CARGO !*\n\n` +
                 `• *DE LA PART DE:* ${formData.name.toUpperCase()}\n` +
                 `• *MON EMAIL:* ${formData.email}\n` +
                 `• *CONCERNE:* ${formData.subject}\n` +
                 `• *MESSAGE:* ${formData.message}`
    
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')
  }

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden font-sans">
      
      {/* --- GRILLE TECHNIQUE (Discrète, pour le sérieux) --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER : On remplace le GPS par un message humain --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-900 pb-10 gap-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Smile size={20} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">À votre écoute 24h/7j</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-slate-900">
              Parlons de <br />
              <span className="text-blue-600">Votre Projet.</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-400 italic leading-relaxed max-w-[200px]">
              "Une question, un devis ou juste envie de dire bonjour ? On vous répond avec plaisir."
            </p>
          </div>
        </div>

        {/* --- BLOC PRINCIPAL --- */}
        <div className="grid lg:grid-cols-12 border border-slate-900 bg-white shadow-[20px_20px_0px_0px_rgba(37,99,235,0.08)]">
          
          {/* --- INFOS : Simples et claires --- */}
          <div className="lg:col-span-4 border-r border-slate-900 divide-y-2 divide-slate-900 bg-slate-50/50">
            <div className="p-10 group transition-colors hover:bg-white">
              <span className="text-[9px] font-bold text-blue-600 block mb-4 tracking-widest">// PASSAGE EN AGENCE</span>
              <h3 className="text-xs font-black uppercase tracking-widest mb-2 text-slate-400">Où nous trouver ?</h3>
              <p className="text-lg font-bold leading-tight text-slate-900">
                Samendin, Ouagadougou<br />
                <span className="text-blue-600 font-medium text-sm">Juste en face de la pharmacie WATI</span>
              </p>
            </div>
            
            <div className="p-10 group transition-colors hover:bg-white">
              <span className="text-[9px] font-bold text-blue-600 block mb-4 tracking-widest">// LIGNE DIRECTE</span>
              <h3 className="text-xs font-black uppercase tracking-widest mb-2 text-slate-400">Appelez-nous</h3>
              <div className="space-y-1">
                <p className="text-2xl font-black tracking-tighter text-slate-900">+226 66 66 36 51</p>
                <p className="text-2xl font-black tracking-tighter text-slate-900">+226 56 77 78 19</p>
              </div>
            </div>

            <div className="p-10 flex items-center gap-4 bg-white/50">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 italic">On vous répond en moins de 2h</span>
            </div>
          </div>

          {/* --- FORMULAIRE : Facile et engageant --- */}
          <div className="lg:col-span-8 p-10 md:p-16">
            <form onSubmit={handleWhatsAppSend} className="space-y-10">
              
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">/ Comment vous appelez-vous ?</label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-slate-100 py-3 text-lg font-bold outline-none focus:border-blue-600 transition-all bg-transparent placeholder:text-slate-200" 
                    placeholder="Votre nom ou société" 
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">/ Votre adresse E-mail</label>
                  <input 
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    className="w-full border-b border-slate-100 py-3 text-lg font-bold outline-none focus:border-blue-600 transition-all bg-transparent placeholder:text-slate-200" 
                    placeholder="mail@exemple.com" 
                  />
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">/ Comment peut-on vous aider ?</label>
                <div className="flex flex-wrap gap-2">
                  {['Fret Aérien', 'Fret Maritime', 'Dédouanement', 'Conseil'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({...formData, subject: s})}
                      className={`px-6 py-2 text-[10px] font-black uppercase tracking-tighter border transition-all ${
                        formData.subject === s ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-100 text-slate-400 hover:border-slate-900 hover:text-slate-900'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">/ Votre message</label>
                <textarea 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2} 
                  className="w-full border-b border-slate-100 py-3 text-lg font-bold outline-none focus:border-blue-600 transition-all bg-transparent resize-none placeholder:text-slate-200" 
                  placeholder="Dites-nous tout..." 
                />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-10 pt-4">
                <Button 
                  type="submit"
                  className="w-full md:w-auto h-16 px-10 bg-slate-900 text-white rounded-none font-black uppercase text-xs tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center gap-4 group"
                >
                  <MessageCircle size={18} />
                  Envoyer par WhatsApp <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
                
                <div className="flex items-center gap-3 text-slate-400">
                   <Zap size={18} className="text-blue-600 fill-blue-600" />
                   <p className="text-[10px] font-bold uppercase tracking-widest leading-tight">
                     On s'occupe de vous <br /> immédiatement.
                   </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">
            LAAFI CARGO — Partenaire de votre croissance — 2026
          </p>
        </div>
      </div>
    </section>
  )
}

export default ContactSection