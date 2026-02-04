/**
 * CONSTANTES GLOBALES - LAAFI CARGO INTERNATIONAL 2026
 */

export const LAAFI_RULES = {
  // MARITIME (Règles 3.1, 3.4, 3.7)
  MARITIME: {
    MIN_CBM: 0.2,
    PRICE_PER_CBM: 250000,
    TRANSIT_MONTHS: 2,
    GROUPAGE_MONTHS: 1,
    PAYMENT_DEADLINE_DAYS: 5, // J-5 avant expédition
    UPDATE_DAY: 6, // Samedi
  },
  
  // AÉRIEN (Règles 4.1, 4.2, 4.7)
  AIR: {
    MIN_WEIGHT_KG: 1,
    PRICE_MCO_STANDARD: 9500,
    PRICE_MCO_PROMO: 8500,
    TRANSIT_DAYS_MAX: 14,
    PAYMENT_DEADLINE_DAYS: 3, // J-3 avant expédition
    UPDATE_DAYS: [2, 5], // Mardi et Vendredi
  },

  // FRAIS ANNEXES
  FEES: {
    REORGANIZATION: 5000, // Si colis mal identifié (Règle 3.2)
    STORAGE_DAILY: 500,    // Après délai de grâce (Règle 4.4)
  }
};

export const CHINE_WAREHOUSE_ADDRESSES = {
  GUANGZHOU_AIR: {
    city: "Guangzhou",
    district: "Baiyun",
    address: "123 Air Cargo Street, Gate 4",
    contact: "+86 123 456 789",
  },
  FOSHAN_SEA: {
    city: "Foshan",
    district: "Nanhai",
    address: "88 Sea Port Road, Warehouse B",
    contact: "+86 987 654 321",
  }
};

export const OUAGA_OFFICE = {
  address: "Samandin, en face de la pharmacie Watie",
  contact: "+226 25 30 XX XX",
  whatsapp: "+226 70 XX XX XX",
};

// Statuts pour les badges UI (Colors Shadcn/Tailwind)
export const STATUS_COLORS = {
  RECU_CHINE: "bg-gray-500",
  EN_COURS_GROUPAGE: "bg-blue-400",
  CHARGE_TRANSIT: "bg-yellow-600",
  ARRIVE_OUAGA: "bg-green-500",
  LIVRE: "bg-black",
  LITIGE_BLOQUE: "bg-red-600",
};