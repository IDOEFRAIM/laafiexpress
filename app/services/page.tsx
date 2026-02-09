"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Plane, Ship, Package, 
  ShieldCheck, Clock, Globe, FileText, 
  ChevronRight, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const ServiceDetail = () => {
  const router = useRouter();

  // Simulation de données - À remplacer par vos props ou un fetch
  const service = {
    code: "Laafi-express",
    category: "Air Freight",
    title: "Fret Aérien",
    subtitle: "Premium Logistics",
    description: "Notre service de fret aérien est conçu pour les entreprises exigeant une ponctualité absolue. Nous gérons des flux complexes entre la Chine et le Burkina Faso avec un protocole de sécurité de niveau industriel.",
    stats: [
      { label: "Transit Time", value: "5-7 Jours" },
      { label: "Fiabilité", value: "99.8%" },
      { label: "Sécurité", value: "Certifiée" }
    ],
    technicalSteps: [
      { id: "01", title: "Enlèvement & Consolidation", detail: "Réception de vos colis dans notre entrepôt sécurisé de Guangzhou." },
      { id: "02", title: "Audit de Conformité", detail: "Vérification des documents douaniers et scan de sécurité." },
      { id: "03", title: "Expédition Prioritaire", detail: "Embarquement sur les vols quotidiens via nos partenaires IATA." },
      { id: "04", title: "Dédouanement Express", detail: "Traitement anticipé pour une sortie rapide à Ouagadougou." }
    ]
  };

  return (
    <div className="min-h-screen mt-4 bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Lignes de structure permanentes */}
      <div className="fixed inset-0 flex justify-around opacity-[0.03] pointer-events-none z-0">
        <div className="w-px h-full bg-black" />
        <div className="w-px h-full bg-black" />
        <div className="w-px h-full bg-black" />
      </div>

      <main className="relative z-10 container mx-auto px-6 pt-12 pb-24">
        {/* Navigation / Header */}
        <nav className="flex items-center justify-between mb-24">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour au catalogue
          </button>
          <div className="text-[10px] font-mono text-slate-300 tracking-widest border border-slate-100 px-4 py-2 uppercase">
            ID: {service.code} // 2026_LOG
          </div>
        </nav>

        {/* Hero Section - Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-8">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-blue-600 font-bold tracking-[0.4em] uppercase text-xs block mb-6"
            >
              Service Spécialisé // {service.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-12"
            >
              {service.title}<br />
              <span className="text-slate-200">{service.subtitle}.</span>
            </motion.h1>
            <p className="text-slate-500 text-lg md:text-2xl font-light leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="border-l-4 border-blue-600 pl-8 space-y-12">
              {service.stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                  <p className="text-4xl font-light tracking-tighter text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Timeline - Swiss Grid Style */}
        <section className="grid grid-cols-1 lg:grid-cols-2 border border-slate-200 mb-32">
          <div className="p-12 md:p-20 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Processus<br />Technique</h2>
            <p className="text-slate-500 text-sm mb-12 max-w-xs leading-relaxed uppercase tracking-widest font-bold">
              Chaque étape est enregistrée numériquement pour une traçabilité totale.
            </p>
            <BarChart3 className="w-12 h-12 text-slate-200" />
          </div>

          <div className="divide-y divide-slate-200 font-sans">
            {service.technicalSteps.map((step) => (
              <div key={step.id} className="p-8 md:p-12 hover:bg-slate-50 transition-colors flex gap-8 items-start group">
                <span className="text-blue-600 font-mono font-bold text-lg">{step.id}</span>
                <div>
                  <h4 className="font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Call to Action */}
        <footer className="flex flex-col md:flex-row items-center justify-between gap-12 border-t border-slate-100 pt-16">
          <div className="space-y-2">
            <h3 className="text-sm font-black uppercase tracking-[0.3em]">Prêt pour l'expédition ?</h3>
            <p className="text-slate-400 text-xs uppercase tracking-widest italic">Contactez le responsable numérique pour une ouverture de dossier.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Button className="flex-1 md:flex-none rounded-none bg-slate-900 text-white hover:bg-blue-600 h-16 px-12 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
              <Link
              href={`https://wa.me/22601479800?text=Bonjour%20Laafi-express,%20je%20souhaite%20ouvrir%20un%20dossier%20pour%20le%20fret%20aérien.%20Merci!`}
              >
              Demander un devis PDF</Link>
            </Button>
            <Button variant="outline" className="flex-1 md:flex-none rounded-none border-slate-200 h-16 px-12 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50">
                 <Link
              href={`https://wa.me/22601479800?text=Bonjour%20Laafi-express,%20je%20souhaite%20ouvrir%20un%20dossier%20pour%20le%20fret%20aérien.%20Merci!`}
              >
              WhatsApp Direct</Link>
              
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ServiceDetail;