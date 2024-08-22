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
  const bookingData = {
    ...params,
    userId: (session.user as any).id,
  }

  await db.booking.create({
    data: bookingData,
  })
  revalidatePath("/barbershops/[id]")
}
