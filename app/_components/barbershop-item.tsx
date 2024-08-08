import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[159px]">
      <CardContent className="p-0">
        {/*IMAGEM*/}
        <div className="relative h-[159px] w-full">
          <Image
            alt={barbershop.name}
            fill
            className="object-cover"
            src={barbershop.imageUrl}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
