'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Maximize2, Camera, Video, Clock, MapPin, ChevronLeft, Zap, Globe, Volume2, VolumeX } from 'lucide-react'
import Link from 'next/link'

interface MediaItem {
  id: number
  type: 'image' | 'video'
  url: string
  category: string
  location: string
  date: string
  dimensions: string
  tag: string
}

const mediaData: MediaItem[] = [
  { id: 1, type: 'video', url: '/arrivagechinoi.mp4', category: 'ARRIVAGE', location: 'HUB CHINE', date: '08.02.2026', dimensions: '1080p', tag: 'URGENT' },
  { id: 2, type: 'video', url: '/chinois_chargage.mp4', category: 'CHARGEMENT', location: 'GUANGZHOU', date: '07.02.2026', dimensions: '1080p', tag: 'PRECISION' },
  { id: 3, type: 'image', url: '/arrivage.jpeg', category: 'ARRIVAGE', location: 'ENTREPÔT BFK', date: '09.02.2026', dimensions: '4K', tag: 'RECEPTION' },
  { id: 4, type: 'video', url: '/pitchmoore.mp4', category: 'OPÉRATIONS', location: 'HQ LAAFI', date: '05.02.2026', dimensions: 'HD', tag: 'STRATEGY' },
  { id: 5, type: 'image', url: '/laaficargo.jpeg', category: 'FLOTTE', location: 'TRANSIT', date: '06.02.2026', dimensions: '4K', tag: 'POWER' },
  { id: 6, type: 'video', url: '/products.mp4', category: 'INSPECTION', location: 'GUANGZHOU', date: '04.02.2026', dimensions: '1080p', tag: 'QUALITY' },
  { id: 7, type: 'image', url: '/teamdocker.jpeg', category: 'ÉQUIPE', location: 'DOCK SUD', date: '03.02.2026', dimensions: 'Portrait', tag: 'HUMAN' },
  { id: 8, type: 'video', url: '/chinoisecargo.mp4', category: 'TRANSIT', location: 'PORT DE LOME', date: '02.02.2026', dimensions: '1080p', tag: 'GLOBAL' },
  { id: 9, type: 'image', url: '/secretaire.jpeg', category: 'ADMIN', location: 'SIEGE', date: '01.02.2026', dimensions: 'Portrait', tag: 'CORE' },
]

export default function StoryInPic() {
  const [filter, setFilter] = useState('ALL')
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const videoRefs = useRef<HTMLVideoElement[]>([])
  const categories = ['ALL', 'ARRIVAGE', 'CHARGEMENT', 'TRANSIT', 'OPÉRATIONS']

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !isAudioEnabled
        if (isAudioEnabled && video.paused) {
          video.play().catch(() => {})
        }
      }
    })
  }, [isAudioEnabled, filter])

  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev)
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20 overflow-hidden mt-8">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <nav className="pt-10 mb-16 flex justify-between items-center">
          <Link href="/" className="group inline-flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-white group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-500 shadow-sm">
              <ChevronLeft className="text-slate-900 group-hover:text-white transition-colors" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-slate-900 transition-colors">Retour au hub</span>
          </Link>

          <button 
            onClick={toggleAudio}
            className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 border ${
              isAudioEnabled ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            {isAudioEnabled ? <Volume2 size={16} className="animate-pulse" /> : <VolumeX size={16} />}
            <span className="text-[10px] font-black uppercase tracking-widest">
              {isAudioEnabled ? 'Audio: Live' : 'Audio: Muted'}
            </span>
          </button>
        </nav>

        <header className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12"
          >
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Zap size={14} className="text-blue-600 fill-blue-600" />
                <span className="text-[11px] font-black uppercase tracking-[0.6em] text-blue-600/50">Travel Express</span>
              </div>
              <h1 className="text-7xl md:text-[140px] font-black text-slate-900 leading-[0.8] tracking-[-0.06em]">
                STORY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 italic font-light">IN MOTION.</span>
              </h1>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-3 text-[10px] font-black tracking-widest uppercase transition-all duration-500 rounded-full border ${
                      filter === cat 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-110' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-900 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <AnimatePresence mode='popLayout'>
            {mediaData.filter(m => filter === 'ALL' || m.category === filter).map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className={`relative group rounded-[2.5rem] overflow-hidden bg-white shadow-2xl shadow-slate-200/50 border-4 border-white ${
                  index % 3 === 0 ? 'md:col-span-8 aspect-[16/10]' : 'md:col-span-4 aspect-square'
                }`}
              >
                <div className="w-full h-full relative overflow-hidden">
                  {item.type === 'video' ? (
                    <video 
                      ref={(el) => { if (el) videoRefs.current[index] = el }}
                      src={item.url} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
                      loop
                      autoPlay
                      playsInline
                      muted={!isAudioEnabled}
                    />
                  ) : (
                    <div 
                      className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-[2s]" 
                      style={{ backgroundImage: `url(${item.url})` }} 
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                  
                  <div className="absolute top-8 left-8 flex gap-2">
                    <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-lg shadow-blue-600/30">
                      #{item.tag}
                    </span>
                    <div className="bg-white/10 backdrop-blur-xl text-white text-[9px] font-black px-4 py-1.5 rounded-full border border-white/20 uppercase">
                      {item.dimensions}
                    </div>
                  </div>

                  {item.type === 'video' && (
                    <div className="absolute top-8 right-8">
                       <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                          {isAudioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                       </div>
                    </div>
                  )}

                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex items-center gap-3 mb-3 text-blue-400">
                      <MapPin size={12} fill="currentColor" className="opacity-80" />
                      <span className="text-[11px] font-black uppercase tracking-[0.3em]">{item.location}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block mb-1">{item.date}</span>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
                          {item.category}<span className="text-blue-600">.</span>
                        </h3>
                      </div>
                      <button className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-slate-900 transform translate-y-20 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:bg-blue-600 hover:text-white">
                        <Maximize2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </main>
  )
}