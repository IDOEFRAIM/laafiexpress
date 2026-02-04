"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // Import pour la navigation
import { 
  ShieldCheck, 
  Eye, 
  Lock, 
  Globe, 
  Database, 
  Smartphone, 
  FileText, 
  ArrowLeft 
} from "lucide-react";

const PrivacyPolicy = () => {
  const router = useRouter();

  const sections = [
    {
      title: "Collecte des données",
      icon: <Eye className="text-blue-500" />,
      content: "Nous collectons les informations nécessaires à la livraison de vos colis : noms, adresses, numéros de téléphone et coordonnées GPS pour le suivi en temps réel."
    },
    {
      title: "Utilisation des informations",
      icon: <Database className="text-purple-500" />,
      content: "Vos données servent exclusivement à l'optimisation des trajets, à la communication sur l'état de vos envois et à la prévention des fraudes."
    },
    {
      title: "Sécurité des colis & données",
      icon: <Lock className="text-emerald-500" />,
      content: "Toutes les données de transaction sont cryptées via SSL. Nos bases de données sont sécurisées selon les standards internationaux de la logistique."
    }
  ];

  return (
    <div className="min-h-screen mt-6 bg-[#f8fafc] text-slate-900 font-sans pb-20">
      
      {/* --- HEADER SECTION --- */}
      <section className="bg-slate-900 pt-12 pb-20 px-6 text-white relative overflow-hidden">
        {/* Effets de lumière en arrière-plan */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* --- BOUTON RETOUR --- */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-12 group font-bold uppercase text-[10px] tracking-[0.2em]"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-400 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span>Retour</span>
          </motion.button>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck className="w-4 h-4" /> Espace Confiance
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Protection de vos <span className="text-blue-400">données</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
              Chez [Nom de l'Entreprise], la sécurité de vos colis commence par la protection de votre vie privée.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- QUICK CARDS --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
        {sections.map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-xl shadow-slate-200/50"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.content}</p>
          </motion.div>
        ))}
      </section>

      {/* --- DETAILED CONTENT --- */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="space-y-16">
          
          <div className="flex gap-8 group">
            <div className="hidden md:flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">1</div>
              <div className="w-[2px] h-full bg-slate-200 mt-4" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-blue-600" /> Vos Droits
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Vous avez le droit d'accéder, de rectifier ou de supprimer vos informations personnelles à tout moment. Pour toute demande liée au RGPD, contactez notre délégué à la protection des données (DPO).
              </p>
            </div>
          </div>

          <div className="flex gap-8 group">
            <div className="hidden md:flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold">2</div>
              <div className="w-[2px] h-full bg-slate-200 mt-4" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <Globe className="w-6 h-6 text-purple-600" /> Partage à des tiers
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Nous ne vendons jamais vos données. Elles sont partagées uniquement avec nos partenaires logistiques certifiés pour le bon acheminement de vos colis.
              </p>
            </div>
          </div>

          {/* BOX INFO / CTA */}
          <div className="p-10 rounded-[40px] bg-blue-600 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-blue-500/30">
            <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md">
              <FileText className="w-12 h-12" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Besoin de plus de précision ?</h3>
              <p className="text-blue-100 opacity-80 mb-6">Notre équipe juridique est disponible pour répondre à vos questions.</p>
              <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-slate-100 transition-colors uppercase text-[10px] tracking-widest">
                Contacter le support
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER NOTE */}
      <footer className="text-center text-slate-400 text-[10px] uppercase font-bold tracking-widest">
        Dernière mise à jour : 04 Février 2026 — [Nom de l'Entreprise] S.A.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;