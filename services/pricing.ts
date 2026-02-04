import { LAAFI_RULES } from "@/lib/constants";
import { TransportType, ShipmentCategory } from "@/types/logistics";

/**
 * SERVICE: PRICING LAAFI CARGO INTERNATIONAL
 * Centralise les calculs financiers selon les CGV 2026.
 */

interface CalculatePriceParams {
  type: TransportType;
  category: ShipmentCategory;
  weight?: number;
  cbm?: number;
  isPromo?: boolean;
}

export const pricingService = {
  /**
   * Calcule le montant total du transport (XOF)
   */
  calculateShipmentPrice({
    type,
    category,
    weight = 0,
    cbm = 0,
    isPromo = false,
  }: CalculatePriceParams): number {
    
    // --- 1. LOGIQUE MARITIME (Règle 3.1) ---
    if (type === "MARITIME") {
      // Cas spécifique du forfait EXPRESS Maritime
      if (category === "EXPRESS") {
        return 226500; // Tarif fixe "EXPRESSION by sea"
      }

      // Application de la règle du minimum 0.2 CBM
      const effectiveCbm = cbm < LAAFI_RULES.MARITIME.MIN_CBM 
        ? LAAFI_RULES.MARITIME.MIN_CBM 
        : cbm;
      
      return effectiveCbm * LAAFI_RULES.MARITIME.PRICE_PER_CBM;
    }

    // --- 2. LOGIQUE AÉRIENNE (Règle 4.1) ---
    if (type === "AERIEN") {
      // Seul le mode MCO est accepté (Règle 4.1)
      const effectiveWeight = weight < LAAFI_RULES.AIR.MIN_WEIGHT_KG 
        ? LAAFI_RULES.AIR.MIN_WEIGHT_KG 
        : weight;

      const rate = isPromo ? LAAFI_RULES.AIR.PRICE_MCO_PROMO : LAAFI_RULES.AIR.PRICE_MCO_STANDARD;
      return effectiveWeight * rate;
    }

    return 0;
  },

  /**
   * Calcule la date limite de paiement (Règles 3.7 et 4.7)
   * @param loadingDate Date de chargement prévue du conteneur/avion
   * @param type Type de transport pour déterminer le délai J-5 ou J-3
   */
  calculateDueDate(loadingDate: Date, type: TransportType): Date {
    const dueDate = new Date(loadingDate);
    const daysBefore = type === "MARITIME" 
      ? LAAFI_RULES.MARITIME.PAYMENT_DEADLINE_DAYS 
      : LAAFI_RULES.AIR.PAYMENT_DEADLINE_DAYS;
    
    dueDate.setDate(dueDate.getDate() - daysBefore);
    return dueDate;
  },

  /**
   * Calcule les frais de réorganisation si le colis est mal identifié (Règle 3.2)
   */
  getReorganizationFee(): number {
    return LAAFI_RULES.FEES.REORGANIZATION;
  }
};