import { db } from "@/db"
import { shipments, invoices } from "@/db/schema"
import { pricingService } from "@/services/pricing"
import { eq } from "drizzle-orm"

export const ShipmentService = {
  async createWithInvoice(data: any, creatorId: string) {
    const price = pricingService.calculateShipmentPrice({
      type: data.type,
      category: data.category,
      weight: data.weight,
      cbm: data.cbm,
    })

    return await db.transaction(async (tx) => {
      const [newShipment] = await tx.insert(shipments).values({
        trackingNumber: data.trackingNumber,
        clientId: data.clientId,
        type: data.type,
        category: data.category,
        contentDescription: data.contentDescription,
        weight: data.weight,
        cbm: data.cbm,
        imageUrl: data.imageUrl,
        invoiceUrl: data.invoiceUrl,
        destination: data.destination,
        status: "RECU_CHINE",
        createdBy: creatorId,
      }).returning()

      const invNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

      const [newInvoice] = await tx.insert(invoices).values({
        invoiceNumber: invNumber,
        shipmentId: newShipment.id,
        clientId: data.clientId,
        subTotal: price,
        additionalFees: 0,
        totalAmount: price,
        status: "EN_ATTENTE",
        dueDate: pricingService.calculateDueDate(new Date(), data.type),
      }).returning()

      return { shipment: newShipment, invoice: newInvoice }
    })
  },

  async getAllShipments() {
    return await db.query.shipments.findMany({
      with: { 
        client: true,
        invoices: { limit: 1 } 
      },
      orderBy: (s, { desc }) => [desc(s.createdAt)],
    })
  },

  async getShipmentsByClient(clientId: string) {
    return await db.query.shipments.findMany({
      where: (s, { eq }) => eq(s.clientId, clientId),
      with: { 
        client: true,
        invoices: { limit: 1 }
      },
      orderBy: (s, { desc }) => [desc(s.createdAt)],
    })
  },

  async updateStatus(shipmentId: string, status: any) {
    return await db.update(shipments)
      .set({ status })
      .where(eq(shipments.id, shipmentId))
  }
}
