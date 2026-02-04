'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Plane, Ship, Package, ArrowRight, Globe, CheckCircle, Ticket, Copy, Sparkles 
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

// Imports de tes composants existants
//import { Navbar } from '@/components/Navbar' // Assure-toi que Navbar est compatible Client ou géré dans le Layout
import PricingSection from '@/components/PricingSection'
import LogoScroller from '@/components/scroller'

// --- Utilities (Animations améliorées) ---

const Reveal = ({ children, delay = 0, y = 30 }: { children: React.ReactNode, delay?: number, y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: y, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }} // Courbe de Bézier pour fluidité
  >
    {children}
  </motion.div>
)

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
         <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-blue-900/20" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 w-full mt-[-100px]">
        <div className="max-w-4xl">
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 backdrop-blur-md text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" /> Leader du Fret Chine-Afrique
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8 drop-shadow-lg">
              L'excellence du <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200">
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
                href="+22601479800"
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

// --- 2. PROMO SECTION (Nouveau !) ---

const PromoSection = () => {
  const [copied, setCopied] = useState(false)
  const code = "LAAFI2026"

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-8 md:p-16 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Cercles décoratifs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-blue-200 font-bold uppercase tracking-widest text-sm mb-4">
              <Ticket className="w-5 h-5" /> Offre Spéciale
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Expédiez plus, payez moins.</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Pour fêter notre nouvelle plateforme, profitez de <span className="font-bold text-white">10% de réduction</span> sur votre première expédition maritime depuis la Chine.
            </p>
          </div>

          {/* Ticket Visuel */}
          <motion.div 
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-3xl w-full max-w-sm"
          >
            <div className="bg-white rounded-2xl p-6 text-slate-900 text-center border-2 border-dashed border-slate-200 relative group">
              {/* Encoches ticket */}
              <div className="absolute -left-4 top-1/2 w-6 h-6 bg-indigo-600 rounded-full -translate-y-1/2" />
              <div className="absolute -right-4 top-1/2 w-6 h-6 bg-indigo-600 rounded-full -translate-y-1/2" />

              <p className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-2">Code Promo</p>
              <div className="text-3xl font-black text-blue-600 tracking-wider mb-4 font-mono">{code}</div>
              
              <Button 
                onClick={handleCopy}
                className={`w-full rounded-xl transition-all duration-300 ${copied ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-900 hover:bg-slate-800"}`}
              >
                {copied ? <span className="flex items-center gap-2"><CheckCircle size={18}/> Copié !</span> : <span className="flex items-center gap-2"><Copy size={18}/> Copier le code</span>}
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// --- 3. SERVICES SECTION (Cards Améliorées) ---

const ServiceCard = ({ title, desc, icon: Icon, features, delay }: any) => (
  <Reveal delay={delay}>
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.15)] transition-all duration-500 group h-full flex flex-col"
    >
      <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 rotate-0 group-hover:-rotate-6 shadow-sm">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-blue-950 mb-4">{title}</h3>
      <p className="text-slate-500 leading-relaxed mb-8 flex-grow">{desc}</p>
      
      <div className="space-y-4 pt-8 border-t border-slate-50">
        <ul className="space-y-3 mb-8">
          {features.map((f: string, i: number) => (
            <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
              <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                 <CheckCircle className="w-3 h-3 text-emerald-600" />
              </div> 
              {f}
            </li>
          ))}
        </ul>
        <Button variant="ghost" className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold group/btn">
          En savoir plus <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  </Reveal>
)

const ServicesSection = () => {
   return (
     <section id="services" className="py-32 bg-slate-50/50">
       <div className="container mx-auto px-6">
         <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-blue-950 text-4xl md:text-5xl font-black mb-6 tracking-tight">Solutions Globales</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-slate-500 text-lg md:text-xl">Une gamme complète de services logistiques conçue pour accélérer vos échanges internationaux avec précision.</p>
            </Reveal>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              delay={0.2}
              title="Fret Aérien"
              desc="La solution la plus rapide pour vos marchandises urgentes. Délais garantis et vols quotidiens."
              icon={Plane}
              features={["Départ Quotidien", "Douane Express", "Livraison J+7"]}
            />
            <ServiceCard 
              delay={0.3}
              title="Fret Maritime"
              desc="Transport économique pour vos gros volumes. Conteneurs complets ou groupage sécurisé."
              icon={Ship}
              features={["LCL & FCL", "Tarifs Négociés", "Suivi en mer"]}
            />
            <ServiceCard 
              delay={0.4}
              title="Logistique"
              desc="Solutions d'entreposage et de distribution. Gestion intégrale de votre supply chain."
              icon={Package}
              features={["Entreposage Sûr", "Préparation", "Dernier Km"]}
            />
         </div>
       </div>
     </section>
   )
}

// --- 4. STATS STRIP ---

const StatsStrip = () => (
  <section className="bg-blue-950 py-24 text-white relative overflow-hidden">
     <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
     
     <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-blue-800/50">
           {[
             { label: "Années d'Expérience", val: "12+" },
             { label: "Pays Desservis", val: "25" },
             { label: "Clients Satisfaits", val: "2k+" },
             { label: "Tonnes expédiées", val: "15k" }
           ].map((s, i) => (
             <Reveal key={i} delay={i * 0.1}>
                <div className="px-4">
                  <div className="text-5xl md:text-6xl font-bold mb-4 text-blue-400">{s.val}</div>
                  <div className="text-blue-200 text-sm font-bold uppercase tracking-widest">{s.label}</div>
                </div>
             </Reveal>
           ))}
        </div>
     </div>
  </section>
)

// --- 5. FOOTER ---

const Footer = () => (
  <footer id="contact" className="bg-white border-t border-slate-100 pt-24 pb-12">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
         <div className="col-span-1 md:col-span-2 pr-10">
            <Link href="/" className="flex items-center gap-2 mb-8">
               <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Ship size={24} />
               </div>
               <span className="font-black text-2xl text-blue-950 tracking-tighter">LAAFI<span className="text-blue-600">CARGO</span></span>
            </Link>
            <p className="text-slate-500 max-w-md leading-relaxed text-lg">
               Nous redéfinissons les standards du transport international. 
               Une approche moderne, efficace et centrée sur le client pour tous vos besoins logistiques entre la Chine et le Burkina Faso.
            </p>
         </div>
         
         <div>
            <h4 className="font-bold text-blue-950 mb-8 text-lg">Liens Rapides</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
               <li><a href="#pricing" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} className="opacity-0 hover:opacity-100 transition-opacity"/> Nos Tarifs</a></li>
               <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} className="opacity-0 hover:opacity-100 transition-opacity"/> Suivre un colis</a></li>
               <li><a href="#contact" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} className="opacity-0 hover:opacity-100 transition-opacity"/> Contact Support</a></li>
            </ul>
         </div>
         
         <div>
            <h4 className="font-bold text-blue-950 mb-8 text-lg">Légal</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
               <li><Link href="/cgv" className="hover:text-blue-600 transition-colors">CGV 2026</Link></li>
               <li><Link href="/confidential" className="hover:text-blue-600 transition-colors">Confidentialité</Link></li>
               <li><Link href="/legal" className="hover:text-blue-600 transition-colors">Mentions Légales</Link></li>
            </ul>
         </div>
      </div>
      
      <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-medium">
         <p>&copy; 2026 Laafi Cargo International. Tous droits réservés.</p>
         <div className="flex gap-6 mt-4 md:mt-0">
            <Globe className="w-5 h-5 hover:text-blue-600 cursor-pointer transition-colors" />
         </div>
      </div>
    </div>
  </footer>
)

// --- MAIN PAGE COMPONENT ---

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
     

      <HeroSection />
      <LogoScroller />
      <PromoSection />
      <ServicesSection />
      <PricingSection />
      <StatsStrip />
      <Footer />
    </div>
  )
}