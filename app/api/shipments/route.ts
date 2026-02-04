import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { shipmentSchema } from "@/lib/validations/shipment"
import { ShipmentService } from "@/services/shipments"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")
    if (!sessionCookie) return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
    
    const sessionData = JSON.parse(sessionCookie.value)
    const userId = sessionData.id

    const body = await req.json()

    // Validation Zod
    const validated = shipmentSchema.parse(body)

    const result = await ShipmentService.createWithInvoice(validated, userId)

    return NextResponse.json({ success: true, data: result })
  } catch (err: any) {
    console.error("API /shipments error:", err)
    return NextResponse.json({ success: false, error: err?.message || "Erreur serveur" }, { status: 500 })
  }
}
