import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'    

import Reveal from './Reveal'

// --- 1. HERO SECTION (Parallax Amélioré) ---

const HeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  
  // Effet Parallax : Le fond descend moins vite et zoome légèrement
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8])

  return (
    <section ref={ref} className="relative h-[110vh] flex items-center overflow-hidden bg-slate-50">
      
      {/* Background Image Dynamique */}
      <motion.div 
        style={{ y: yBg, scale: scaleBg }} 
        className="absolute inset-0 z-0"
      >
         <Image 
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
            alt="Logistics Background"
            fill
            className="object-cover"
            priority
         />
         {/* Overlay Bleu Profond (Pas de Noir !) */}
         <motion.div 
           style={{ opacity: opacityOverlay }}
           className="absolute inset-0 bg-blue-950/50 mix-blend-multiply" 
         />
         <div className="absolute inset-0 bg-linear-to-t from-slate-50 via-transparent to-blue-900/20" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 w-full -mt-25">
        <div className="max-w-4xl">
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 backdrop-blur-md text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" /> Leader du transport Chine-Afrique
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8 drop-shadow-lg">
              L'excellence du <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 via-white to-blue-200">
                Fret International.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-xl md:text-2xl text-blue-50 font-light max-w-2xl leading-relaxed mb-12 drop-shadow-md">
                Connectez la Chine, l'Europe et l'Afrique. Une gestion logistique transparente et sécurisée pour les entreprises exigeantes.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 py-7 text-lg shadow-lg shadow-blue-600/30 transition-all hover:scale-105">
                <Link
                href="+22666663651"
                >
                  Obtenir un devis
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm rounded-full px-8 py-7 text-lg transition-all">
                Suivre mon colis
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}


export default HeroSection