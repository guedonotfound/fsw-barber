"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface CancelBookingParams {
  bookingId: string
}

export const cancelBooking = async (params: CancelBookingParams) => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw new Error("Usuário não autenticado")
  }

  // Verificar se a reserva existe e pertence ao usuário
  const booking = await db.booking.findUnique({
    where: { id: params.bookingId },
  })

  if (!booking) {
    throw new Error("Reserva não encontrada")
  }

  if (booking.userId !== (session.user as any).id) {
    throw new Error("Você não tem permissão para cancelar esta reserva")
  }

  // Cancelar a reserva
  await db.booking.delete({
    where: { id: params.bookingId },
  })

  revalidatePath("/barbershops/[id]")
}
