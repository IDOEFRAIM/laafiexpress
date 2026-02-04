"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AnimatedHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8FAFC] dark:bg-zinc-950">
      {/* Mesh Background Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/30 dark:bg-blue-600/5 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-sky-100/30 dark:bg-sky-600/5 blur-[120px] rounded-full" 
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-32 md:py-48 text-center md:text-left">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-600 text-xs font-black tracking-widest uppercase mb-8"
            >
              Logistique Internationale 2026
            </motion.span>
            
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter text-zinc-900 dark:text-white mb-8 italic">
              LAAFI CARGO <br />
              <span className="text-blue-600 not-italic">EXPÉDITIONS</span>
            </h1>
            
            <p className="max-w-md text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-12 font-medium">
              Nous redéfinissons le transport international avec une approche technologique, sécurisée et <span className="text-zinc-900 dark:text-white font-bold">100% transparente.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="/register" 
                className="inline-flex h-16 items-center justify-center rounded-[2rem] bg-blue-600 px-10 text-white font-black shadow-2xl shadow-blue-500/30 transition-all text-sm uppercase tracking-widest"
              >
                Créer mon compte
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="/login" 
                className="inline-flex h-16 items-center justify-center rounded-[2rem] border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-10 text-zinc-900 dark:text-white font-black hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-sm uppercase tracking-widest"
              >
                Accéder au portail
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="relative z-10 w-full aspect-square overflow-hidden rounded-[4rem] shadow-2xl border-[12px] border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800">
              <Image 
                src="/hero.webp" 
                alt="Laafi Cargo Shipping" 
                fill
                className="object-cover transition-transform duration-1000 hover:scale-110" 
                priority
              />
              
              {/* Floating Stat Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 right-8 bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 hidden md:block"
              >
                <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-1">Impact Global</p>
                <p className="text-2xl font-black italic tracking-tighter text-zinc-900 dark:text-white">+500T / Mois</p>
              </motion.div>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-sky-400/20 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
