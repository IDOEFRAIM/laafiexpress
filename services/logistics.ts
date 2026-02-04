import { db } from "@/db"
import { containers, shipments } from "@/db/schema"
import { eq, inArray } from "drizzle-orm"
import { ShipmentStatus } from "@/types/logistics"

export const LogisticsService = {
  /**
   * Créer un nouveau conteneur/vol
   */
  async createContainer(data: { containerNumber: string; departureDate: Date }) {
    const [newContainer] = await db.insert(containers).values({
      containerNumber: data.containerNumber,
      departureDate: data.departureDate,
      status: "OUVERT",
    }).returning()
    return newContainer
  },

  /**
   * Associer des colis à un conteneur (Groupage)
   */
  async addShipmentsToContainer(containerId: string, shipmentIds: string[]) {
    return await db.update(shipments)
      .set({ 
        containerId: containerId,
        status: "EN_COURS_GROUPAGE" 
      })
      .where(inArray(shipments.id, shipmentIds))
      .returning()
  },

  /**
   * Mise à jour du conteneur avec cascade sur les colis
   */
  async updateContainerLifecycle(containerId: string, newStatus: "OUVERT" | "FERME" | "EN_MER" | "ARRIVE") {
    const statusMapping: Record<string, ShipmentStatus> = {
      "EN_MER": "CHARGE_TRANSIT",
      "ARRIVE": "ARRIVE_OUAGA",
    }

    return await db.transaction(async (tx) => {
      // 1. Update le conteneur
      await tx.update(containers)
        .set({ status: newStatus })
        .where(eq(containers.id, containerId))

      // 2. Cascade sur les colis si nécessaire
      const shipmentStatus = statusMapping[newStatus]
      if (shipmentStatus) {
        await tx.update(shipments)
          .set({ status: shipmentStatus, updatedAt: new Date() })
          .where(eq(shipments.containerId, containerId))
      }
      return { success: true }
    })
  },

  /**
   * Récupérer tous les conteneurs avec le compte de colis
   */
  async getAllContainers() {
    return await db.query.containers.findMany({
      with: {
        shipments: true
      },
      orderBy: (c, { desc }) => [desc(c.createdAt)],
    })
  },

  /**
   * Récupérer les colis en attente de groupage (RECU_CHINE et pas de conteneur)
   */
  async getShipmentsForGroupage() {
    return await db.query.shipments.findMany({
      where: (s, { and, eq, isNull }) => and(
        eq(s.status, "RECU_CHINE"),
        isNull(s.containerId)
      ),
      with: { client: true }
    })
  },
}