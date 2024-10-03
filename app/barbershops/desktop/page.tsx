import BarbershopItem from "@/app/_components/desktop/barbershop-item"
import Header from "@/app/_components/desktop/header"
import { db } from "@/app/_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const DesktopBarbershopsPage = async ({
  searchParams,
}: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.title,
        mode: "insensitive",
      },
    },
  })

  return (
    <>
      <Header />
      <div className="flex w-full justify-center pt-10">
        <div className="w-[82.22%]">
          <h2 className="font-bolt pb-5 pt-10 text-xl">
            Resultados para &quot;{searchParams.title || searchParams.service}
            &quot;
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default DesktopBarbershopsPage
