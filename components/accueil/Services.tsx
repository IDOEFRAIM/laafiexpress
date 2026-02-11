'use client'

import { Activity, Container, ShoppingCart, Ship, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ServiceCard = ({ title, desc, icon: Icon, features, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    viewport={{ once: true }}
    // Fond blanc pur avec bordure subtile
    className="bg-white p-10 md:p-14 border-b md:border-b-0 md:border-r border-slate-100 last:border-r-0 hover:bg-slate-50/50 transition-all duration-500 group flex flex-col h-full relative"
  >
    <div className="flex justify-between items-start mb-16">
      {/* Carré d'icône plus doux */}
      <div className="h-16 w-16 border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-500 text-slate-600">
        <Icon className="w-7 h-7 stroke-[1.2px]" />
      </div>
      <div className="text-right">
        <span className="text-[9px] font-mono text-slate-300 tracking-[0.4em] uppercase block">Service</span>
        <span className="text-[10px] font-black text-slate-900 uppercase">00{index + 1}</span>
      </div>
    </div>

    <div className="mb-12">
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-6 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <div className="w-12 h-0.5 bg-blue-600 mb-8" />
      <p className="text-slate-500 text-sm leading-relaxed font-medium uppercase tracking-tight italic">
        {desc}
      </p>
    </div>
    
    <div className="mt-auto">
      <ul className="space-y-4 mb-10">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            <div className="h-1 w-1 bg-slate-200 group-hover:bg-blue-600 transition-colors" />
            {f}
          </li>
        ))}
      </ul>
      
      <Button variant="outline" asChild className="w-full justify-between rounded-none border border-slate-900 h-14 text-[10px] uppercase font-black tracking-[0.3em] bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all group/btn px-6 shadow-sm">
        <Link href="https://wa.me/+22666663651" className="flex items-center justify-between w-full">
          Voir plus <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
        </Link>
      </Button>
    </div>
  </motion.div>
)

const ServicesSection = () => {
  return (
    <section id="services" className="py-40 bg-white relative overflow-hidden border-y border-slate-100">
      
      {/* Grille de fond très discrète (style Blueprint clair) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-32 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-8">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 font-black tracking-[0.6em] uppercase text-[10px]">Laafi Cargo International</span>
            </div>
            <h2 className="text-6xl md:text-[100px] font-black text-slate-900 leading-[0.8] tracking-tighter uppercase">
              FLUX <br />
              <span className="text-slate-100 font-light italic">MAITRISÉS.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 border-l-2 border-slate-100 pl-8">
            <p className="text-slate-400 text-[11px] uppercase tracking-[0.2em] leading-relaxed font-bold">
              Laafi Cargo déploie une ingénierie logistique dédiée au corridor Chine-Burkina Faso pour une performance sans compromis.
            </p>
          </div>
        </div>

        {/* Grille des services avec ombre portée très légère */}
        <div className="grid md:grid-cols-3 border border-slate-100 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
          <ServiceCard 
            index={0}
            title="Transport Partagé (Groupage)"
            desc="Ne payez que l'espace que vous utilisez. Nous regroupons vos petits colis pour vous faire profiter des tarifs de gros, par avion ou par bateau."
            icon={Ship}
            features={["Départs chaque semaine", "Livraison Express", "Colis suivis et sécurisés"]}
          />
          <ServiceCard 
            index={1}
            title="Conteneurs Complets"
            desc="Besoin de tout un conteneur ? Nous mettons à votre disposition des unités de 20 ou 40 pieds pour vos grosses commandes, avec une gestion totale."
            icon={Container}
            features={["Conteneur scellé", "Livraison direct usine", "Suivi en temps réel"]}
          />
          <ServiceCard 
            index={2}
            title="Achat & Recherche en Chine"
            desc="On trouve pour vous les meilleurs produits au meilleur prix. Nous vérifions la qualité sur place et sécurisons vos paiements aux fournisseurs."
            icon={ShoppingCart}
            features={["Recherche de fournisseurs", "Vérification des produits", "Paiements sécurisés"]}
          />
        </div>

        {/* Footer de section technique
        <div className="mt-20 flex flex-wrap justify-between items-center gap-6 opacity-60">
            <div className="flex gap-12 text-slate-900">
                <div className="flex flex-col">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Protocol</span>
                    <span className="text-[10px] font-black uppercase">Standard ISO/LFI-2026</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Network</span>
                    <span className="text-[10px] font-black uppercase">Guangzhou - Ouagadougou</span>
                </div>
            </div>
            <div className="h-px grow bg-slate-100 mx-8 hidden lg:block" />
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.4em]">LAAFI EXPRESS // LOGISTICS SYSTEM</span>
        </div> */}
      </div>
    </section>
  )
}

export default ServicesSection