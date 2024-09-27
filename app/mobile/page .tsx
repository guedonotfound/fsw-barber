import Header from "../_components/header"
import Image from "next/image"
import { db } from "../_lib/prisma"
import BarbershopItem from "../_components/barbershop-item"
import BookingItem from "../_components/booking-item"
import Search from "../_components/search"
import QuickSearch from "../_components/quick-search"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"

const MobileHomePage = async () => {
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
  const confirmedBookings = await getConfirmedBookings()

  return (
    <>
      <div>
        {/* header */}
        <Header />
        <div className="p-5">
          {/* TEXTO */}
          <h2 className="text-xl font-bold">
            Olá, {session?.user?.name?.split(" ")[0] ?? "bem vindo"}!
          </h2>
          <p>
            <span className="capitalize">
              {format(new Date(), "EEEE, dd", { locale: ptBR })}
            </span>
            <span> de </span>
            <span className="capitalize">
              {format(new Date(), "MMMM", { locale: ptBR })}
            </span>
          </p>

          {/* BUSCA */}
          <div className="mt-6">
            <Search />
          </div>

          {/* BUSCA RÁPIDA */}
          <div className="mt-2">
            <QuickSearch />
          </div>

          {/* IMAGEM */}
          <div className="relative mt-6 h-[150px] w-full">
            <Image
              alt="Agende nos melhores com FSW Barber"
              src="/banner-01.png"
              fill
              className="rounded-xl object-cover"
            />
          </div>

          {/* AGENDAMENTO */}
          {confirmedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Agendamentos
              </h2>
              <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {confirmedBookings.map((booking) => (
                  <BookingItem
                    key={booking.id}
                    booking={JSON.parse(JSON.stringify(booking))}
                  />
                ))}
              </div>
            </>
          )}

          {/* RECOMENDADOS */}
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>

          {/* POPULARES */}
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileHomePage
