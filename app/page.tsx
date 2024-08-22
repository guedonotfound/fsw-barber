import Header from "./_components/header"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import QuickSearch from "./_components/quick-search"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
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
      })
    : []

  return (
    <>
      <div>
        {/* header */}
        <Header />
        <div className="p-5">
          {/* TEXTO */}
          {session?.user ? (
            <h2 className="text-xl font-bold">Olá, {session.user.name}!</h2>
          ) : (
            <h2 className="text-xl font-bold">
              Olá, <span>faça seu login</span>!
            </h2>
          )}
          <p>Segunda-feira, 05 de agosto.</p>

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
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>
          <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>

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

export default Home
