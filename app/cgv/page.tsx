import React from "react"

export default function CGVPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-slate">
      <h1 className="text-2xl font-bold text-center mb-8">CONDITIONS GÉNÉRALES DE SERVICE 2026</h1>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p><strong>Nom de l’entreprise :</strong> Laafi Cargo International</p>
        <p><strong>Siège :</strong> Samandin, Ouagadougou, Burkina Faso (en face de la Pharmacie Wati)</p>
        <p><strong>Téléphone :</strong> 56 77 78 19 / 70 75 38 58</p>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">1. Engagements de Laafi Cargo International</h2>
      <p>Laafi Cargo International s’engage à :</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Fournir un service professionnel, sécurisé et transparent ;</li>
        <li>Manipuler les colis avec soin et selon les normes internationales de transport ;</li>
        <li>Informer les clients de l’état de leurs colis et de tout retard ou incident ;</li>
        <li>Garantir la confidentialité et la sécurité des informations clients.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">2. Responsabilité du client</h2>
      <p>Le client s’engage à :</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Fournir des informations exactes sur le contenu et la valeur des colis ;</li>
        <li>Fournir une facture ou document justificatif détaillant la commande ;</li>
        <li>Être joignable pour tout complément d’information ;</li>
        <li>Régler les frais de transport au moins 5 jours avant l’expédition ;</li>
        <li>Se présenter rapidement pour le retrait des colis à destination.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-blue-800 border-b pb-2">SECTION MARITIME</h2>

      <h3 className="text-lg font-semibold mt-6 mb-2">3.1 Volume minimum accepté</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Laafi Cargo International n’accepte pas les colis inférieurs à 0,2 CBM.</li>
        <li>Tout colis inférieur à ce volume sera refusé, et si expédié, le client devra payer le prix minimum de 0,2 
CBM pour récupérer son colis.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">3.2 Identification et réorganisation</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Tout colis livré sans nom ou coordonnées complètes ne sera pas pris en charge.</li>
        <li>Le client doit notifier rapidement et fournir une photo du colis pour toute réorganisation.</li>
        <li>La réorganisation est facturable.</li>
        <li>Les colis sans nom sont ignorés si le client ne se présente pas rapidement avant la date d’expédition.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">3.3 Mise à jour des colis</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Les mises à jour de la section maritime se font une fois par semaine, chaque samedi.</li>
        <li>Pour tout colis livré, le client doit notifier la date de livraison et fournir une photo avec nom, prénom et 
numéro de téléphone visibles.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">3.4 Délais de livraison</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Le délai moyen de livraison maritime est de 3 mois :</li>
        <li className="ml-5">1 mois pour le groupage des colis</li>
        <li className="ml-5">2 mois pour le transit maritime, à compter de la date de chargement sur le navire.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">3.5 Produits non conformes</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Sont interdits : batteries lithium, articles militaires, aliments frais, drones, vélomoteurs avec batterie 
lithium.</li>
        <li>Tout client qui omet volontairement de déclarer un produit nécessitant autorisation assume toutes les 
conséquences légales et financières.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">3.6 Déclaration du contenu et facture</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Chaque colis doit être accompagné d’une facture détaillée et d’une description précise du contenu.</li>
        <li>Tout colis sans facture ou description claire peut être refusé, retardé ou réorganisé avec facturation.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">3.7 Paiement des frais</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Les frais de transport maritime doivent être réglés au moins 5 jours avant l’expédition.</li>
        <li>Tout retard de paiement peut entraîner le refus ou le report de l’expédition du colis.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-blue-800 border-b pb-2">SECTION AÉRIENNE</h2>

      <h3 className="text-lg font-semibold mt-6 mb-2">4.1 Volumes, poids et type de colis</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Poids minimum : 1 kg.</li>
        <li>Les colis ne doivent pas être très larges et doivent respecter les contraintes de transport aérien.</li>
        <li>Laafi Cargo International n’expédie pas les colis LTA. Seuls les colis MCO (Colis simple sans batteries)
sont acceptés.</li>
        <li>Nous ne proposons pas de service express ; les délais de livraison sont standards, soit 14 jours 
maximum à compter de la date d’expédition.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">4.2 Délais de livraison</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Le délai de transit commence à partir de l’enregistrement du colis pour le vol, et non à partir de sa 
remise dans nos locaux.</li>
        <li>Les mises à jour sur le suivi sont fournies en temps réel ou 2 fois par semaine (mardi et vendredi), 
selon les possibilités de la compagnie aérienne.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">4.3 Produits interdits</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Interdits : batteries lithium, drones, produits chimiques dangereux, explosifs ou inflammables, articles 
militaires, aliments frais ou périssables non autorisés, produits médicaux.</li>
        <li>Tout client qui omet volontairement de déclarer un colis nécessitant autorisation assume toutes les 
responsabilités légales et financières.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">4.4 Déclaration du contenu et facture</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Chaque colis doit être accompagné d’une description précise du contenu et d’une facture complète, 
indiquant :</li>
        <li className="ml-5">Liste détaillée des articles</li>
        <li className="ml-5">Valeur de chaque article</li>
        <li className="ml-5">Informations complètes de l’expéditeur et du destinataire</li>
        <li>Tout colis sans facture ou description claire peut être refusé, retardé ou réorganisé avec facturation.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">4.5 Identification des colis</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Nom, prénom, adresse complète et numéro de téléphone du destinataire doivent être clairement 
indiqués.</li>
        <li>Les colis sans nom sont ignorés si le client ne se présente pas rapidement avant la date d’envoi.</li>
        <li>Toute réorganisation d’un colis non identifié ou mal étiqueté sera facturée.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">4.6 Assurance et responsabilité</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Laafi Cargo International manipule les colis avec soin, mais n’assume la responsabilité que pour les 
colis correctement déclarés et assurés.</li>
        <li>Retards ou pertes dus à grèves, conditions météorologiques, restrictions aériennes ou décisions 
douanières sont hors responsabilité de l’entreprise.</li>
        <li>En cas de perte d’un colis survenant a notre niveau , on s’engage a rembourser la valeur 
correspondante.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">4.7 Paiement des frais</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Les frais de transport aérien doivent être réglés au moins 3 jours avant l’expédition.</li>
        <li>Tout retard de paiement peut entraîner le refus ou le report de l’expédition du colis.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">5. Traçabilité et transparence</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Laafi Cargo International assure un suivi rigoureux de tous les colis.</li>
        <li>Les clients doivent fournir les informations nécessaires pour tout complément de suivi.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">6. Clause de non-responsabilité</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Laafi Cargo International ne pourra être tenue responsable des retards, pertes ou dommages causés 
par :</li>
        <li className="ml-5">Force majeure, intempéries, grèves, retards portuaires ou aériens, décisions administratives ou 
douanières.</li>
      </ul>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-bold mb-4">NOS ADRESSE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-semibold text-blue-900">Adresse aérienne</h4>
                <p className="text-gray-500 italic">Adresse à communiquer par le service client</p>
            </div>
            <div>
                <h4 className="font-semibold text-blue-900">Adresse maritime</h4>
                <p className="text-gray-500 italic">Adresse à communiquer par le service client</p>
            </div>
        </div>
      </div>
    </div>
  )
}
