import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "../ui/card"
import Image from "next/image"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Separator } from "../ui/separator"
import PhoneItem from "../phone-item"
import PartnershipBanner from "./partnership-banner"

interface BarbershopDetailsProps {
  barbershop: Barbershop
}

const barbershopTimes = [
  { day: "Segunda-feira", time: "08:00 - 18:00" },
  { day: "Terça-feira", time: "08:00 - 18:00" },
  { day: "Quarta-feira", time: "08:00 - 18:00" },
  { day: "Quinta-feira", time: "08:00 - 18:00" },
  { day: "Sexta-feira", time: "08:00 - 18:00" },
  { day: "Sábado", time: "09:00 - 15:00" },
  { day: "Domingo", time: "Fechado" },
]

const BarbershopDetails = ({ barbershop }: BarbershopDetailsProps) => {
  return (
    <Card>
      <CardContent className="space-y-5 p-5">
        <div className="relative flex h-[180px] w-full items-end">
          <Image
            src="/map.png"
            alt={`Mapa da barbearia ${barbershop.name}`}
            fill
            className="rounded-xl object-cover"
          />
          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3 border-b border-solid text-sm">
          <h2 className="font-bold uppercase text-gray-400">Sobre nós</h2>
          <p className="text-justify">{barbershop?.description}</p>
        </div>

        <Separator />

        <div className="space-y-3">
          {barbershop.phones.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </div>

        <Separator />

        <div className="space-y-[10px]">
          {barbershopTimes.map((time) => (
            <div key={time.day} className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{time.day}</p>
              <p className="text-sm">{time.time}</p>
            </div>
          ))}
        </div>
        <Separator />

        <PartnershipBanner />
      </CardContent>
    </Card>
  )
}

export default BarbershopDetails
