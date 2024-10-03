"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    throw new Error("Usuário não autenticado")
  }

  const userId = (session.user as any).id

  const existingBooking = await db.booking.findFirst({
    where: {
      serviceId: params.serviceId,
      date: params.date,
      userId: userId,
    },
  })

  if (existingBooking) {
    throw new Error(
      "Reserva duplicada: já existe uma reserva para esse serviço e horário.",
    )
  }

  const bookingData = {
    ...params,
    userId: userId,
  }

  await db.booking.create({
    data: bookingData,
  })

  revalidatePath("/barbershops/[id]")
}
