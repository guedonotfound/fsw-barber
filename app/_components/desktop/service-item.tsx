"use client"

import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { useRouter } from "next/navigation"
import { createBooking } from "@/app/_actions/create-booking"
import { toast } from "sonner"
import SignInDialog from "../sign-in-dialog"
import { Dialog, DialogContent } from "../ui/dialog"
import { useBooking } from "@/app/hooks/use-booking"
import BookingSheet from "./booking-sheet"
import { getTimeList } from "@/app/services/booking-service"
import { Button } from "../ui/button"
import Image from "next/image"

interface ServiceItemProps {
  service: any
  barbershop: any
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const router = useRouter()
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const {
    selectedDay,
    setSelectedDay,
    selectedTime,
    setSelectedTime,
    dayBookings,
    loadingTimes,
    selectedDate,
  } = useBooking(service.id)

  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)
  const [loadingBooking, setLoadingBooking] = useState(false)

  const handleBookingCreate = async () => {
    if (!selectedDate) return

    setLoadingBooking(true)
    try {
      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })

      setBookingSheetIsOpen(false)
      router.refresh()
      toast.success("Agendamento criado com sucesso!")
    } catch (error) {
      toast.error("Erro ao criar agendamento!")
    } finally {
      setLoadingBooking(false)
    }
  }

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          {/* IMAGEM */}
          <div className="relative h-[110px] w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          {/* DIREITA */}
          <div className="flex-1 space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            {/* PREÇO E BOTÃO */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setBookingSheetIsOpen(true)
                }}
              >
                Reservar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <BookingSheet
        isOpen={bookingSheetIsOpen}
        onOpenChange={() => setBookingSheetIsOpen(false)}
        onBookingCreate={handleBookingCreate}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        loadingTimes={loadingTimes}
        availableTimes={getTimeList({ bookings: dayBookings, selectedDay })}
        handleDateSelect={setSelectedDay}
        handleTimeSelect={setSelectedTime}
        loadingBooking={loadingBooking}
        barbershop={barbershop}
        service={service}
        selectedDate={selectedDate}
      />

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={() => setSignInDialogIsOpen(false)}
      >
        <DialogContent>
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
