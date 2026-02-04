import * as z from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(3, "Nom complet requis"),
  email: z.string().email("Email invalide"),
  
  // Validation pour les numéros du Burkina Faso (8 chiffres)
  phone: z.string().regex(/^(56|70|75|77|01|02|05|06|07)\d{6}$/, {
    message: "Numéro de téléphone Burkina invalide (ex: 56777819)",
  }),
  
  role: z.enum(["ADMIN", "AGENT_CHINA", "AGENT_BURKINA", "CLIENT"]),
  
  // Règle 3.2 & 4.5 : Le code client pour l'identification sur les colis
  clientCode: z.string().min(4, "Le code client est requis").regex(/^LF-/, "Le code doit commencer par LF-"),
  
  address: z.string().min(5, "Adresse de résidence requise"),
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;