'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Maximize2, Crosshair } from 'lucide-react'

const MapSection = () => {
  // Coordonnées approximatives de Samendin, Ouagadougou
  const lat = 12.3714
  const lng = -1.5197
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.234!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDIyJzE3LjAiTiAxwrAzMScxMC45Ilc!5e0!3m2!1sfr!2sbf!4v1700000000000!5m2!1sfr!2sbf&q=Samendin+Ouagadougou`

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Grid de fond blueprint */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="border border-slate-900 bg-white p-1 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.03)]">
          
          {/* Header de la carte (Style Terminal) */}
          <div className="flex items-center justify-between border-b border-slate-900 p-4 bg-slate-50">
            <div className="flex items-center gap-4">
              <Crosshair className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Positionnement Satellite // Hub_01</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:block">
                <span className="text-[9px] font-mono text-slate-400 uppercase">Coord: {lat}°N / {lng}°W</span>
              </div>
              <Maximize2 className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="grid lg:grid-cols-12">
            {/* Colonne de données techniques à gauche */}
            <div className="lg:col-span-3 border-r border-slate-900 p-8 hidden lg:flex flex-col justify-between bg-white">
              <div className="space-y-8">
                <div>
                  <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-2">// Zone Opérationnelle</p>
                  <h3 className="text-sm font-black uppercase tracking-tighter italic">Samendin Centre</h3>
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">// Point de Repère</p>
                  <p className="text-xs font-bold uppercase leading-tight">Face Pharmacie WATI</p>
                </div>
              </div>

              <div className="bg-slate-900 p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-3 h-3 text-blue-400" />
                  <span className="text-[8px] font-black uppercase tracking-widest">Routing</span>
                </div>
                <p className="text-[10px] leading-relaxed opacity-70">
                  Accès direct via Avenue de la Liberté. Zone de déchargement certifiée.
                </p>
              </div>
            </div>

            {/* Le conteneur de la Map */}
            <div className="lg:col-span-9 h-[500px] relative group">
              {/* Overlay esthétique de scan pour le côté élitiste */}
              <div className="absolute inset-0 pointer-events-none border-[15px] border-white z-10" />
              
              <iframe
                src={mapUrl}
                className="w-full h-full grayscale contrast-125 invert-[0.05] sepia-[0.1]"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Petit badge flottant (Style Blueprint) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="absolute bottom-10 right-10 bg-white border border-slate-900 p-6 z-20 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-900 flex items-center justify-center">
                    <MapPin className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest">LAAFI CARGO HQ</h4>
                    <p className="text-[9px] text-slate-400 font-mono italic">Sector 01, Ouagadougou</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer technique */}
          <div className="border-t border-slate-900 p-3 bg-slate-50 flex justify-between items-center px-8">
            <span className="text-[8px] font-mono text-slate-400 uppercase tracking-[0.4em]">Map_Data_Source: Google_Cloud_API</span>
            <span className="text-[8px] font-mono text-slate-400 uppercase">Live_Sync: 100% Verified</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection