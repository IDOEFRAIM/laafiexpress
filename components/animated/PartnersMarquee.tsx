"use client"

import React from "react"
import { motion } from "framer-motion"

const partners = [
  "Orange",
  "Moov Africa",
  "UEMOA",
  "BCEAO",
  "ONEA",
  "SONABEL",
  "ARCEP",
  "CCI-BF",
]

export default function PartnersMarquee() {
  // Duplicate the array to create a seamless loop
  const duplicatedPartners = [...partners, ...partners]

  return (
    <div className="w-full bg-zinc-50 py-12 dark:bg-zinc-950 overflow-hidden relative">
      <div className="mb-8 text-center">
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Ils nous font confiance</h2>
      </div>
      
      {/* Gradient overlays for smooth fading on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-50 to-transparent z-10 dark:from-zinc-950" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-50 to-transparent z-10 dark:from-zinc-950" />

      <motion.div 
        className="flex whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedPartners.map((partner, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-center px-12 text-2xl font-bold text-zinc-300 dark:text-zinc-700 hover:text-primary transition-colors cursor-default"
          >
            {partner}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
