import * as z from "zod";

export const shipmentSchema = z.object({
  trackingNumber: z.string().min(5, "Le numéro de tracking est obligatoire"),
  clientId: z.string().uuid("Veuillez sélectionner un client"),
  type: z.enum(["AERIEN", "MARITIME"]),

  // Catégorie métier: MCO, LTA, EXPRESS, CONTAINER
  category: z.enum(["MCO", "LTA", "EXPRESS", "CONTAINER"]),

  // Dimensions
  weight: z.number().optional(),
  cbm: z.number().optional(),

  contentDescription: z.string().min(3, "La description est obligatoire pour la douane"),

  destination: z.string().min(3, "La destination est obligatoire").default("Ouagadougou (Samandin)"),

  // Produits interdits ou signalés
  hasBattery: z.boolean().default(false),

  // Preuves / documents
  imageUrl: z.string().url("La photo du colis est obligatoire (Règle 3.2)"),
  invoiceUrl: z.string().url().optional(),
}).superRefine((data, ctx) => {
  // --- Règles Aériennes (Section 4)
  if (data.type === "AERIEN") {
    // Seul MCO est accepté en aérien
    if (data.category !== "MCO") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Seuls les colis de catégorie MCO sont acceptés pour le transport aérien (Règle 4.1)",
        path: ["category"],
      });
    }

    // Poids minimum 1 kg
    if (typeof data.weight !== "number" || data.weight < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Poids minimum 1 kg pour les envois aériens (Règle 4.1)",
        path: ["weight"],
      });
    }

    // Batteries interdites
    if (data.hasBattery) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Batteries lithium interdites pour le transport aérien (Règle 4.3)",
        path: ["hasBattery"],
      });
    }
  }

  // --- Règles Maritimes (Section 3)
  if (data.type === "MARITIME") {
    // Volume minimum accepté 0.2 CBM
    if (typeof data.cbm !== "number" || data.cbm < 0.2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Volume minimum accepté pour le transport maritime : 0,2 CBM (Règle 3.1)",
        path: ["cbm"],
      });
    }

    // Facture / déclaration requise
    if (!data.invoiceUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Une facture ou document justificatif est obligatoire pour le transport maritime (Règle 3.6)",
        path: ["invoiceUrl"],
      });
    }

    // Batteries interdites (général)
    if (data.hasBattery) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Batteries lithium interdites pour le transport maritime (Règle 3.5)",
        path: ["hasBattery"],
      });
    }
  }
});

export type ShipmentFormValues = z.infer<typeof shipmentSchema>;