"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // Import pour la navigation
import { Scale, Building2, Globe, HardDrive, Mail, Phone, ArrowLeft } from "lucide-react";

const MentionsLegales = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen mt-6 bg-white text-slate-900 pt-12 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* --- BOUTON RETOUR --- */}
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-12 group font-bold uppercase text-[10px] tracking-[0.2em]"
        >
          <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Retour</span>
        </motion.button>

        {/* En-tête de page */}
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-blue-600 font-bold uppercase tracking-[0.3em] text-xs mb-4"
          >
            <Scale className="w-4 h-4" /> Cadre Juridique
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
            Mentions <br />
            <span className="text-slate-400 italic">Légales.</span>
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 rounded-full" />
        </header>

        {/* Grille d'informations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
          
          {/* Identité de l'entreprise */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <Building2 className="w-6 h-6 text-slate-600" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Éditeur du site</h2>
            </div>
            <div className="space-y-3 text-slate-600 leading-relaxed pl-2 border-l-2 border-slate-50">
              <p className="font-bold text-slate-900">[NOM DE L'ENTREPRISE]</p>
              <p>Forme sociale : SAS au capital de [Montant]€</p>
              <p>Siège social : [Adresse complète]</p>
              <p>RCS : [Numéro] - [Ville]</p>
              <p>TVA : [Numéro de TVA]</p>
              <p className="text-blue-600 font-bold">Licence Transport : [N° de licence]</p>
            </div>
          </section>

          {/* Contact & Responsabilité */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <Mail className="w-6 h-6 text-slate-600" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Contact</h2>
            </div>
            <div className="space-y-4 pl-2 border-l-2 border-slate-50">
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+225 [Numéro]</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>contact@votre-domaine.com</span>
              </div>
              <p className="text-slate-600">Directeur de publication : [Nom]</p>
            </div>
          </section>

          {/* Hébergement */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <HardDrive className="w-6 h-6 text-slate-600" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Hébergement</h2>
            </div>
            <div className="pl-2 border-l-2 border-slate-50">
              <p className="text-slate-600 leading-relaxed">
                Site hébergé par <span className="font-bold text-slate-900">[Nom Hébergeur]</span>.<br />
                [Adresse de l'hébergeur]<br />
                Support : [Lien web]
              </p>
            </div>
          </section>

          {/* Propriété Intellectuelle */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <Globe className="w-6 h-6 text-slate-600" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Propriété</h2>
            </div>
            <div className="pl-2 border-l-2 border-slate-50">
              <p className="text-slate-600 leading-relaxed italic text-sm">
                L'ensemble du contenu (logos, textes, visuels) appartient à [NOM]. 
                Toute reproduction sans accord est passible de poursuites.
              </p>
            </div>
          </section>

        </div>

        {/* Note de bas de page */}
        <footer className="mt-32 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
          <p>© 2026 [NOM DE L'ENTREPRISE] — AXIANE LOGISTICS</p>
          <p>Mise à jour : Février 2026</p>
        </footer>

      </div>
    </div>
  );
};

export default MentionsLegales;