import { useState, useEffect, useMemo } from "react"
import { Booking } from "@prisma/client"
import { addDays, set } from "date-fns"
import { toast } from "sonner"
import { fetchBookingsForDay, getTimeList } from "../services/booking-service"

export const useBooking = (serviceId: string) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [loadingTimes, setLoadingTimes] = useState(false)

  useEffect(() => {
    if (!selectedDay) return

    const fetchBookings = async () => {
      setLoadingTimes(true)
      try {
        const bookings = await fetchBookingsForDay(serviceId, selectedDay)
        setDayBookings(bookings)

        const availableTimes = getTimeList({ bookings, selectedDay })

        if (availableTimes.length === 0) {
          setSelectedDay(addDays(selectedDay, 1))
          setSelectedTime(undefined)
          toast.error("Sem horários para a data selecionada!")
        }
      } catch (error) {
        toast.error("Erro ao buscar agendamentos!")
      } finally {
        setLoadingTimes(false)
      }
    }

    fetchBookings()
  }, [selectedDay, serviceId])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return undefined
    return set(selectedDay, {
      hours: Number(selectedTime.split(":")[0]),
      minutes: Number(selectedTime.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

  return {
    selectedDay,
    setSelectedDay,
    selectedTime,
    setSelectedTime,
    dayBookings,
    loadingTimes,
    selectedDate,
  }
}
