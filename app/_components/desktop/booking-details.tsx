"use client"

import { Prisma } from "@prisma/client"
import { Card, CardContent } from "../ui/card"
import Image from "next/image"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import BookingSummary from "../booking-summary"
import PhoneItem from "../phone-item"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { isFuture } from "date-fns"
import { cancelBooking } from "@/app/_actions/cancel-booking"
import { toast } from "sonner"
import { Separator } from "../ui/separator"
import { Loader2 } from "lucide-react"
import { useState } from "react"

type BookingType = Prisma.BookingGetPayload<{
  include: { service: { include: { barbershop: true } } }
}>

interface BookingDetailsProps {
  booking: BookingType
  setSelectedBooking: React.Dispatch<React.SetStateAction<BookingType | null>>
  // eslint-disable-next-line no-unused-vars
  onCancel: (bookingId: string) => void
}

const BookingDetails = ({
  booking,
  setSelectedBooking,
  onCancel,
}: BookingDetailsProps) => {
  const {
    service: { barbershop },
  } = booking

  const isConfirmed = isFuture(booking.date)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancelBooking = async (bookingId: string) => {
    setIsCancelling(true)
    setIsDialogOpen(false)
    try {
      await cancelBooking({ bookingId })
      toast.success("Reserva cancelada com sucesso!")
      setSelectedBooking(null)
      onCancel(bookingId)
    } catch (error) {
      toast.error("Erro ao cancelar reserva!")
    } finally {
      setIsCancelling(false)
    }
  }

  return (
    <Card className="mt-[87px]">
      <CardContent>
        <div className="relative mt-6 flex h-[180px] w-full items-end">
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

        <div className="my-5 w-[404px] space-y-3 text-sm">
          <h2 className="font-bold uppercase text-gray-400">Sobre nós</h2>
          <p className="text-justify">{barbershop?.description}</p>
        </div>

        <Separator />

        <div className="mt-5 space-y-5">
          <div className="space-y-3">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>

          <Separator />

          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <div className="mb-3 mt-3">
            <BookingSummary
              barbershop={barbershop}
              service={booking.service}
              selectedDate={booking.date}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isConfirmed && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="mt-6 w-full"
                  variant="destructive"
                  onClick={() => setIsDialogOpen(true)}
                  disabled={isCancelling}
                >
                  {isCancelling && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Cancelar reserva
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-lg">
                <DialogHeader>
                  <DialogTitle>Você deseja cancelar sua reserva?</DialogTitle>
                  <DialogDescription>
                    Você deseja <span className="font-extrabold">MESMO</span>{" "}
                    efetivar o cancelamento? Esta ação{" "}
                    <span className="font-extrabold">NÃO</span> poderá ser
                    desfeita e você terá de realizar a reserva novamente.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row gap-3">
                  <DialogClose asChild>
                    <Button className="w-full" variant="secondary">
                      Voltar
                    </Button>
                  </DialogClose>
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancelar reserva
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingDetails
