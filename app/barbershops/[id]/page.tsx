import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon } from "lucide-react"
import Image from "next/image"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  //chamar o bd

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  })
  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop?.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
        >
          <ChevronLeftIcon />
        </Button>
      </div>
    </div>
  )
}

export default BarbershopPage
