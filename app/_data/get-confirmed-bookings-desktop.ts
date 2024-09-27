"use server"

import { db } from "../_lib/prisma"

interface getConfirmedBookingsDesktopProps {
  userId: string
}

export const getConfirmedBookingsDesktop = async ({
  userId,
}: getConfirmedBookingsDesktopProps) => {
  if (!userId) {
    return []
  }
  return await db.booking.findMany({
    where: {
      userId: userId,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
    take: 1,
  })
}
