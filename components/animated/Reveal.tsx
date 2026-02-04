"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { useScrollReveal } from "@/lib/hooks/useScrollReveal"

export default function Reveal({ children }: { children: React.ReactNode }) {
  useScrollReveal()

  return (
    <motion.div
      className="reveal opacity-0 translate-y-4"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  )
}
