import BarbershopDetails from "@/app/_components/desktop/barbershop-details"
import Header from "@/app/_components/desktop/header"
import ServiceItem from "@/app/_components/service-item"
import { Card, CardContent } from "@/app/_components/ui/card"
import { db } from "@/app/_lib/prisma"
import { MapPinIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const DesktopBarbershopPage = async ({ params }: BarbershopPageProps) => {
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
      <Header />
      <div className="flex justify-center gap-[3%] py-10">
        <div className="w-[53%]">
          <div className="relative h-[487px]">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              className="object-cover"
              fill
            />
          </div>
          <div className="flex items-center justify-between py-5">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">{barbershop.name}</h1>
              <div className="flex items-center gap-1">
                <MapPinIcon className="text-primary" size={16} />
                <p className="text-sm">{barbershop.address}</p>
              </div>
            </div>
            <Card>
              <CardContent className="h-full w-fit px-5 py-[10px]">
                <div className="flex items-center justify-center gap-2">
                  <StarIcon className="fill-primary text-primary" size={20} />
                  <p className="text-xl">5.0</p>
                </div>
                <p className="text-xs">XXX avaliações</p>
              </CardContent>
            </Card>
          </div>
          <div className="py-5">
            <h2 className="mb-3 text-sm font-bold uppercase text-gray-400">
              Serviços
            </h2>
            <div className="grid grid-cols-2 gap-5 p-0">
              {barbershop?.services.map((service) => (
                <ServiceItem
                  service={JSON.parse(JSON.stringify(service))}
                  key={service.id}
                  barbershop={JSON.parse(JSON.stringify(barbershop))}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-[27%]">
          <BarbershopDetails barbershop={barbershop} />
        </div>
      </div>
    </div>
  )
}

export default DesktopBarbershopPage
