'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Globe2, Ship, Plane, Zap, Send, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'FRET AÉRIEN',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Numéro de LAAFI Cargo
    const phoneNumber = "22601479800" 
    
    // Construction du message formaté (Style Bordereau)
    const text = `*Nouveau message depuis le siteweb - LAAFI CARGO*\n\n` +
                 `• *EXPÉDITEUR:* ${formData.name.toUpperCase()}\n` +
                 `• *EMAIL:* ${formData.email}\n` +
                 `• *NATURE:* ${formData.subject}\n` +
                 `• *Message:* ${formData.message}`
    
    const encodedText = encodeURIComponent(text)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank')
  }

  return (
    <section id="contact" className="py-40 bg-white relative overflow-hidden font-sans">
      
      {/* --- GRID ARCHITECTURAL (0.5px Precision) --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER : TYPOGRAPHIE SUISSE --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-2 border-slate-900 pb-12 gap-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-10 bg-blue-600"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Terminal de Liaison / Global Hub</span>
            </div>
            <h2 className="text-7xl md:text-[130px] font-black leading-[0.8] tracking-tighter uppercase text-slate-900">
              Nous <br />
              <span className="text-blue-600">Contacter.</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-mono text-slate-300 uppercase tracking-widest leading-loose">
              LAT: 12.3714° N<br />LONG: 1.5197° W<br />OUAGADOUGOU, BF
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 border border-slate-900 bg-white">
          
          {/* --- PANEL GAUCHE : PROTOCOLES --- */}
          <div className="lg:col-span-4 border-r border-slate-900 divide-y divide-slate-900 bg-slate-50/30">
            <div className="p-10">
              <span className="text-[9px] font-mono text-blue-600 block mb-6 font-bold">// 01 Position geographique</span>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-slate-400">Emplacement Physique</h3>
              <p className="text-sm font-bold uppercase leading-tight text-slate-900">
                Samendin, Ouagadougou<br />
                En face de la pharmacie WATI
              </p>
            </div>
            
            <div className="p-10">
              <span className="text-[9px] font-mono text-blue-600 block mb-6 font-bold">// 02 COM_LINES</span>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-slate-400">Assistance Logistique</h3>
              <p className="text-xl font-black tracking-tighter text-slate-900">+226 66 66 36 51</p>
              <p className="text-xl font-black tracking-tighter text-slate-900">+226 56 77 78 19</p>
            </div>

            <div className="p-10 h-full">
               <span className="text-[9px] font-mono text-blue-600 block mb-6 font-bold">Delais de reponse</span>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">2 jours</span>
               </div>
            </div>
          </div>

          {/* --- PANEL DROIT : TRANSMISSION (FORM) --- */}
          <div className="lg:col-span-8 p-10 md:p-20">
            <form onSubmit={handleWhatsAppSend} className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-mono">/ Entité ou Nom</label>
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text" 
                  className="w-full border-b border-slate-900 py-3 text-sm font-bold uppercase outline-none focus:border-blue-600 transition-all bg-transparent" 
                  placeholder="IDENTITÉ REQUISE" 
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-mono">/ Canal Mail</label>
                <input 
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  className="w-full border-b border-slate-900 py-3 text-sm font-bold uppercase outline-none focus:border-blue-600 transition-all bg-transparent" 
                  placeholder="EMAIL@DOMAIN.COM" 
                />
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-mono">/ Nature du Transit</label>
                <input 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border-b border-slate-900 py-3 text-sm font-bold uppercase outline-none focus:border-blue-600 transition-all bg-transparent cursor-pointer"
                >
                </input>
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-mono">/ Détails de la Mission</label>
                <textarea 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2} 
                  className="w-full border-b border-slate-900 py-3 text-sm font-bold uppercase outline-none focus:border-blue-600 transition-all bg-transparent resize-none" 
                  placeholder="Veuillez fournir des détails précis sur vos preoccupations" 
                />
              </div>

              <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-10 pt-10">
                <Button 
                  type="submit"
                  className="w-full md:w-auto h-20 px-16 bg-slate-900 text-white rounded-none font-black uppercase text-[12px] tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center gap-6 group"
                >
                  TRANSMETTRE VIA WHATSAPP <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                </Button>
                
                <div className="flex items-center gap-4 text-slate-400">
                   <Zap size={18} className="text-blue-600" />
                   <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">
                     Protocole de réponse <br /> ultra-prioritaire.
                   </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* --- FOOTER : MENTIONS TECHNIQUES --- */}
        <div className="mt-16 flex flex-wrap justify-between items-center gap-8 border-t border-slate-100 pt-8">
          <div className="flex gap-12">
            <div>
              <p className="text-[8px] font-mono text-slate-300 uppercase mb-1">Status</p>
              <p className="text-[10px] font-black uppercase tracking-widest">Active Connection</p>
            </div>
            <div>
              <p className="text-[8px] font-mono text-slate-300 uppercase mb-1">Encoding</p>
              <p className="text-[10px] font-black uppercase tracking-widest">UTF-8 Standard</p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 italic">© 2026 LAAFI CARGO — SYSTEM_INTEGRATION</span>
        </div>
      </div>
    </section>
  )
}

export default ContactSection