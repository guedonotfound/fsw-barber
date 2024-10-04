import Image from "next/image"
import { db } from "../_lib/prisma"
import BookingItem from "../_components/desktop/booking-item"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import Search from "../_components/desktop/search"
import BarbershopCarousel from "../_components/desktop/barbershop-carousel"
import { getConfirmedBookingsDesktop } from "../_data/get-confirmed-bookings-desktop"
import { Button } from "../_components/ui/button"
import Link from "next/link"
import Header from "../_components/desktop/header"

const DesktopHomePage = async () => {
  const session = await getServerSession(authOptions)

  const barbershops = await db.barbershop.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      imageUrl: true,
    },
  })

  const popularBarbershops = await db.barbershop.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      imageUrl: true,
    },
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = await getConfirmedBookingsDesktop({
    userId: (session?.user as any)?.id,
  })

  return (
    <>
      <div>
        <Header isHomePage />

        <div className="relative h-[463px] w-full px-16 py-16">
          <Image
            src="/wallpaper.jpeg"
            alt="Wallpaper"
            fill
            className="z-0 object-cover opacity-20"
          />
          <div className="relative flex items-center justify-between gap-16">
            <div className="min-h-[335px] w-[439px]">
              <h2 className="text-2xl">
                Olá,{" "}
                {session?.user?.name?.split(" ")[0] ?? (
                  <span className="font-bold">faça seu login</span>
                )}
                !
              </h2>
              <p className="text-sm">
                <span className="capitalize">
                  {format(new Date(), "EEEE, dd", { locale: ptBR })}
                </span>
                <span> de </span>
                <span className="capitalize">
                  {format(new Date(), "MMMM", { locale: ptBR })}
                </span>
              </p>

              <div className="py-[46.5px]">
                <Search />
              </div>

              {confirmedBookings.length > 0 && (
                <>
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase text-gray-400">
                      Próximo agendamento
                    </h2>
                    <Button
                      variant="link"
                      size="sm"
                      className="max-h-fit px-0 text-xs"
                      asChild
                    >
                      <Link href="./bookings">Ver todos</Link>
                    </Button>
                  </div>
                  <BookingItem
                    key={confirmedBookings[0].id}
                    booking={JSON.parse(JSON.stringify(confirmedBookings[0]))}
                  />
                </>
              )}
            </div>

            <div className="h-[335px] max-w-[56%]">
              <BarbershopCarousel
                title="Recomendados"
                barbershops={barbershops}
                delay={2000}
              />
            </div>
          </div>
        </div>

        <div className="px-16 py-10">
          <BarbershopCarousel
            title="Populares"
            barbershops={popularBarbershops}
          />
        </div>

        <div className="px-16 pb-10">
          <BarbershopCarousel
            title="Mais visitados"
            barbershops={barbershops}
          />
        </div>
      </div>
    </>
  )
}

export default DesktopHomePage
