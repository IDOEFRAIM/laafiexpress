'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Phone, Clock, Sparkles } from 'lucide-react'

const MapSection = () => {
  // Coordonnées exactes fournies : 12°20'41.3"N 1°32'26.1"W
  const lat = 12.344806
  const lng = -1.540583
  
  // URL Google Maps Embed avec les coordonnées précises
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.23456789!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDIwJzQxLjMiTiAxwrAzMicyNi4xIlc!5e0!3m2!1sfr!2sbf!4v1700000000000!5m2!1sfr!2sbf`

  return (
    <section className="py-24 bg-white relative overflow-hidden font-sans">
      
      {/* --- LA GRILLE : Signature visuelle Laafi Cargo --- */}
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
        
        {/* Titre de la section - Chaleureux & Pro */}
        <div className="mb-16 text-center md:text-left">
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Nous trouver</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-none">
            VENEZ NOUS <span className="text-blue-600">VOIR.</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-xl">
            L'agence de Samendin vous accueille pour toutes vos opérations. Passez prendre un café avec l'équipe.
          </p>
        </div>

        {/* Le Bloc principal : Structure rigide, esprit accueillant */}
        <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-blue-900/5 border border-slate-100 flex flex-col lg:flex-row min-h-[600px]">
          
          {/* Infos pratiques à gauche */}
          <div className="lg:w-1/3 p-10 md:p-14 bg-white flex flex-col justify-between border-r border-slate-50">
            <div className="space-y-12">
              
              {/* Adresse précise */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 transition-all group-hover:bg-blue-600 group-hover:rotate-6">
                  <MapPin className="text-blue-600 w-7 h-7 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Siège social</p>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    Samendin Centre,<br />
                    Face Pharmacie WATI
                  </h3>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 transition-all group-hover:bg-emerald-600 group-hover:-rotate-6">
                  <Clock className="text-emerald-600 w-7 h-7 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Disponibilité</p>
                  <p className="text-lg font-bold text-slate-700">Lun - Ven : 08h — 18h</p>
                  <p className="text-sm text-slate-400 font-medium italic">Samedi : 09h — 13h</p>
                </div>
              </div>

              {/* Contact direct */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 transition-all group-hover:bg-orange-600 group-hover:scale-110">
                  <Phone className="text-orange-600 w-7 h-7 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Contact Agence</p>
                  <p className="text-lg font-bold text-slate-700">On vous guide par <br/>téléphone au besoin.</p>
                </div>
              </div>
            </div>

            {/* Bouton d'action GPS */}
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-14 w-full py-5 bg-slate-900 text-white rounded-[20px] flex items-center justify-center gap-4 font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 group"
            >
              <Navigation size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Lancer l'itinéraire
            </a>
          </div>

          {/* La Carte à droite */}
          <div className="lg:w-2/3 h-[450px] lg:h-auto relative bg-slate-100">
            <iframe
              src={mapUrl}
              className="w-full h-full grayscale-[0.2] contrast-[1.05]"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            />
            
            {/* Badge flottant : Position Exacte */}
            <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md border border-white p-5 rounded-[24px] shadow-2xl hidden md:flex items-center gap-4 border-b-4 border-b-blue-600">
              <div className="w-3 h-3 rounded-full bg-blue-600 animate-ping" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block italic">Position Vérifiée</span>
                <span className="text-sm font-bold text-slate-900 uppercase">Laafi Cargo — Samendin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note de bas de page technique */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[9px] font-bold uppercase tracking-[0.4em]">
          <p>LAT: 12.3448° N — LONG: 1.5405° W</p>
          <div className="h-[1px] bg-slate-100 flex-1 mx-8 hidden md:block" />
          <p>Secteur 04 • Ouagadougou • Burkina Faso</p>
        </div>
      </div>
    </section>
  )
}

export default MapSection