"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type FormState = {
  trackingNumber: string
  clientId: string
  type: "AERIEN" | "MARITIME"
  category: string
  weight?: number
  cbm?: number
  contentDescription: string
  hasBattery: boolean
  imageUrl: string
  invoiceUrl?: string
}

export default function ShipmentForm({ clientId }: { clientId: string }) {
  const [form, setForm] = useState<FormState>({
    trackingNumber: "",
    clientId,
    type: "AERIEN",
    category: "MCO",
    weight: undefined,
    cbm: undefined,
    contentDescription: "",
    hasBattery: false,
    imageUrl: "",
    invoiceUrl: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
        }),
      })

      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.error || "Erreur lors de la création du colis")
      } else {
        setSuccess("Colis créé avec succès")
        setForm((f) => ({ ...f, trackingNumber: "", contentDescription: "", imageUrl: "", invoiceUrl: "" }))
      }
    } catch (err: any) {
      setError(err.message || "Erreur réseau")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm">Numéro de tracking</label>
        <Input value={form.trackingNumber} onChange={(e) => setForm({ ...form, trackingNumber: e.target.value })} />
      </div>

      <div>
        <label className="block mb-1 text-sm">Type</label>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })} className="w-full rounded-md border px-3 py-2">
          <option value="AERIEN">Aérien</option>
          <option value="MARITIME">Maritime</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm">Catégorie</label>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-md border px-3 py-2">
          <option value="MCO">MCO</option>
          <option value="LTA">LTA</option>
          <option value="EXPRESS">Express</option>
          <option value="CONTAINER">Container</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm">Poids (kg)</label>
          <Input type="number" value={form.weight ?? ""} onChange={(e) => setForm({ ...form, weight: e.target.value ? Number(e.target.value) : undefined })} />
        </div>
        <div>
          <label className="block mb-1 text-sm">Volume (CBM)</label>
          <Input type="number" value={form.cbm ?? ""} onChange={(e) => setForm({ ...form, cbm: e.target.value ? Number(e.target.value) : undefined })} />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm">Description du contenu</label>
        <textarea value={form.contentDescription} onChange={(e) => setForm({ ...form, contentDescription: e.target.value })} className="w-full rounded-md border px-3 py-2" />
      </div>

      <div className="flex items-center gap-2">
        <input id="battery" type="checkbox" checked={form.hasBattery} onChange={(e) => setForm({ ...form, hasBattery: e.target.checked })} />
        <label htmlFor="battery" className="text-sm">Contient une batterie lithium</label>
      </div>

      <div>
        <label className="block mb-1 text-sm">URL de la photo (image)</label>
        <Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
      </div>

      <div>
        <label className="block mb-1 text-sm">URL facture / document</label>
        <Input value={form.invoiceUrl} onChange={(e) => setForm({ ...form, invoiceUrl: e.target.value })} />
      </div>

      {error && <div className="text-destructive">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}

      <div>
        <Button type="submit" disabled={loading}>{loading ? "En cours..." : "Créer le colis"}</Button>
      </div>
    </form>
  )
}
