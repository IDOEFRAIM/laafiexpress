"use client"

import React from "react"
import { motion } from "framer-motion"
import { Anchor, Plane, Shield, Clock, TrendingUp, Headphones } from "lucide-react"

const services = [
  {
    title: "Transport Maritime",
    description: "Solutions de groupage économiques (LCL) et conteneurs complets (FCL) à partir de 0.2 CBM.",
    icon: Anchor,
    color: "bg-blue-500",
  },
  {
    title: "Transport Aérien",
    description: "Livraison rapide sous 14 jours pour vos colis MCO sécurisés et suivis.",
    icon: Plane,
    color: "bg-sky-400",
  },
  {
    title: "Sécurité & Assurance",
    description: "Protection totale et remboursement garanti en cas d'incident à notre niveau.",
    icon: Shield,
    color: "bg-emerald-500",
  },
  {
    title: "Suivi en Temps Réel",
    description: "Traçabilité complète via notre plateforme digitale pour chaque étape du transit.",
    icon: Clock,
    color: "bg-amber-500",
  },
  {
    title: "Optimisation de Coûts",
    description: "Tarification transparente et compétitive adaptée à vos volumes et types d'envoi.",
    icon: TrendingUp,
    color: "bg-indigo-500",
  },
  {
    title: "Support Dédié",
    description: "Agents disponibles à Ouagadougou et Guangzhou pour vous accompagner 24/7.",
    icon: Headphones,
    color: "bg-rose-500",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white"
          >
            Nos Services Experts
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            Nous mettons les technologies de demain au service de vos défis logistiques d'aujourd'hui.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group relative p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-sm hover:shadow-xl overflow-hidden"
            >
              {/* Animated background shape on hover */}
              <motion.div 
                className={`absolute -right-8 -top-8 w-24 h-24 rounded-full ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl`}
              />
              
              <div className={`mb-6 inline-flex p-3 rounded-xl ${service.color} text-white shadow-lg`}>
                <service.icon size={24} />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mt-8 flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                En savoir plus <span className="ml-2">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
