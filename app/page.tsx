'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { 
  HeroSection, 
  LogoScroller,
  About, 
  StoryPreview, 
  Services, 
  Stat, 
  PricingSection, 
  Team, 
  MapSection,
  Ideabox,
  Contacter, 
  Footer 
} from '@/components/accueil';

function TextReveal({ children, className }: { children: string, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  
  return (
    <h2 ref={ref} className={`${className} overflow-hidden`}>
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </h2>
  )
}

export default function LandingPage() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const yHero = useTransform(scrollYProgress, [0, 0.2], ["0%", "30%"])
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.98])

  const scaleStory = useTransform(scrollYProgress, [0.1, 0.25], [0.95, 1])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white overflow-hidden">
      
      {/* Barre de progression subtile */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[110] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* --- 1. HERO SECTION --- */}
      <motion.div 
        style={{ y: yHero, opacity: opacityHero, scale: scaleHero }}
        className="relative z-10 w-full"
      >
        <HeroSection />
      </motion.div>

      {/* --- CONTENU PRINCIPAL (SUR FOND CLAIR) --- */}
      <div className="relative z-20 bg-white">
        
        {/* Transition avec les logos */}
        <div className="border-y border-slate-100 py-10 bg-white">
           <LogoScroller />
        </div>

        {/* 2. ABOUT & STORY */}
        <div className="pt-20 pb-10 px-4 sm:px-6">
          <div id="about" className="max-w-7xl mx-auto mb-20">
            <TextReveal className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter text-center">
              LOGISTIQUE SANS LIMITES.
            </TextReveal>
            <About />
          </div>

          <motion.div 
            style={{ scale: scaleStory }}
            className="w-full max-w-7xl mx-auto overflow-hidden shadow-2xl rounded-3xl"
          >
            <StoryPreview />
          </motion.div>
        </div>

        {/* 4. EXPERTISE & SERVICES (Harmonisé en Blanc/Bleu) */}
        <div id="services" className="py-24 bg-slate-50/50">
           <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16 px-4">
                <span className="text-blue-600 font-black tracking-[0.4em] uppercase text-xs">Division Solutions</span>
                <TextReveal className="text-4xl md:text-6xl font-black mt-4 text-slate-900 tracking-tighter">
                  VOTRE CARGO, NOTRE PRIORITÉ
                </TextReveal>
             </div>
             {/* Le composant Services utilise maintenant son propre design "Light" */}
             <Services />
           </div>
        </div>

        {/* 5. STATS (Le seul bloc de couleur forte pour l'impact) */}
        <div className="bg-blue-600 py-24">
           <Stat />
        </div>

        {/* 6. PRICING */}
        <div id="pricing" className="bg-white py-24">
           <div className="max-w-7xl mx-auto px-4">
             <PricingSection />
           </div>
        </div>

        {/* 7. TEAM & MAP */}
        <div className="bg-slate-50 py-20 border-y border-slate-100">
           <Team />
           <div id="infos" className="mt-20">
             <MapSection />
           </div>
        </div>

        {/* 8. CONTACT & FOOTER */}
        <div id="contact" className="bg-white">
          <Ideabox />
          <Contacter />
          <Footer />
        </div>
      </div>
    </div>
  )
}