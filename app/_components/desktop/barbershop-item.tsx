import { Card, CardContent } from "../ui/card"
import Image from "next/image"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarbershopItemProps {
  barbershop: {
    id: string
    name: string
    address: string
    imageUrl: string
  }
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-h-[295px] min-w-[221px] rounded-2xl">
      <Link href={`/barbershops/${barbershop.id}`}>
        <CardContent className="p-0 px-1 pt-1 opacity-100">
          {/*IMAGEM*/}
          <div className="relative h-[163px] w-full">
            <Image
              alt={barbershop.name}
              fill
              className="rounded-2xl object-cover"
              src={barbershop.imageUrl}
            />

            <Badge
              className="absolute left-2 top-2 space-x-1"
              variant="secondary"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <p className="text-xs font-semibold">5,0</p>
            </Badge>
          </div>

          {/* TEXTO */}
          <div className="px-1 py-3">
            <h3 className="truncate font-semibold">{barbershop.name}</h3>
            <p className="truncate text-xs text-gray-400">
              {barbershop.address}
            </p>
            <Button variant="secondary" className="mt-3 w-full">
              Reservar
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

export default BarbershopItem
