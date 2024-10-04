"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet"
import { Calendar } from "../ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { addDays, isPast, isToday, set } from "date-fns"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { Dialog, DialogContent } from "../ui/dialog"
import SignInDialog from "../sign-in-dialog"
import BookingSummary from "../booking-summary"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { getBookings } from "@/app/_actions/get-bookings"
import { createBooking } from "@/app/_actions/create-booking"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const [hour, minutes] = time.split(":").map(Number)

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))

    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookingOnCurrentTime) {
      return false
    }

    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const router = useRouter()
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  const [loadingTimes, setLoadingTimes] = useState(false)
  const [loadingBooking, setLoadingBooking] = useState(false)

  useEffect(() => {
    if (!selectedDay) return

    const fetchBookings = async () => {
      setLoadingTimes(true)
      try {
        const bookings = await getBookings({
          date: selectedDay,
          serviceId: service.id,
        })
        setDayBookings(bookings)

        const availableTimes = getTimeList({ bookings, selectedDay })

        if (
          availableTimes.length === 0 &&
          selectedDay.toDateString() === new Date().toDateString()
        ) {
          const nextAvailableDay = addDays(selectedDay, 1)
          setSelectedDay(nextAvailableDay)
          setSelectedTime(undefined)
          toast.error("Sem horários para a data selecionada!")
        }
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error)
        toast.error("Erro ao buscar agendamentos!")
      } finally {
        setLoadingTimes(false)
      }
    }

    fetchBookings()
  }, [selectedDay, service.id])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return
    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    setLoadingBooking(true)
    try {
      if (!selectedDate) return

      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })
      handleBookingSheetOpenChange()
      toast.success("Reserva criada com sucesso!", {
        action: {
          label: "Ver agendamentos",
          onClick: () => router.push("/bookings"),
        },
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva!")
    } finally {
      setLoadingBooking(false)
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({ bookings: dayBookings, selectedDay })
  }, [dayBookings, selectedDay])

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
              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="w-[80%] overflow-y-auto px-0 [&::-webkit-scrollbar]:hidden">
                  <SheetHeader>
                    <SheetTitle className="text-center">
                      Fazer reserva
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex w-full max-w-none justify-center border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      fromDate={new Date()}
                      onSelect={handleDateSelect}
                    />
                  </div>

                  {loadingTimes ? (
                    <div className="flex h-[81.11px] items-center justify-center border-b border-solid p-5">
                      <Loader2 className="animate-spin" />
                    </div>
                  ) : (
                    selectedDay && (
                      <ScrollArea>
                        <div className="flex gap-3 border-b border-solid p-5">
                          {timeList.map((time) => (
                            <Button
                              key={time}
                              className="rounded-full"
                              variant={
                                selectedTime === time ? "default" : "outline"
                              }
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    )
                  )}

                  {selectedDate && (
                    <div className="p-5">
                      <BookingSummary
                        barbershop={barbershop}
                        service={service}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}
                  <SheetFooter className="mt-5 px-5">
                    <Button
                      className="w-full"
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime || loadingBooking}
                    >
                      {loadingBooking && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%] rounded-lg">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
