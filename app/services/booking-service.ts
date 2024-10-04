import { Booking } from "@prisma/client"
import { set, isPast, isToday } from "date-fns"
import { getBookings } from "@/app/_actions/get-bookings"

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
  selectedDay: Date | undefined
}

export const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  if (!selectedDay) return []
  return TIME_LIST.filter((time) => {
    const [hour, minutes] = time.split(":").map(Number)
    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))

    if (timeIsOnThePast && isToday(selectedDay)) return false

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    return !hasBookingOnCurrentTime
  })
}

export const fetchBookingsForDay = async (
  serviceId: string,
  selectedDay: Date,
) => {
  try {
    const bookings = await getBookings({
      date: selectedDay,
      serviceId,
    })
    return bookings
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error)
    throw error
  }
}
