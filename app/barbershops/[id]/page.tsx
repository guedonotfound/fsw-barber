import { notFound } from "next/navigation"
import DesktopBarbershopPage from "./desktop/page"
import MobileBarbershopPage from "./mobile/page"
import { db } from "@/app/_lib/prisma"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }
  return (
    <div>
      <div className="block 2md:hidden">
        <MobileBarbershopPage barbershop={barbershop} />
      </div>
      <div className="hidden 2md:block">
        <DesktopBarbershopPage barbershop={barbershop} />
      </div>
    </div>
  )
}

export default BarbershopPage
