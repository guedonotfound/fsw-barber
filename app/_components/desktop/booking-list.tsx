"use client"

import { Prisma } from "@prisma/client"
import { ScrollArea } from "../ui/scroll-area"
import BookingItem from "./booking-item"
import { useState } from "react"
import BookingDetails from "./booking-details"

type BookingType = Prisma.BookingGetPayload<{
  include: { service: { include: { barbershop: true } } }
}>

interface BookingListProps {
  confirmedBookings: BookingType[]
  concludedBookings: BookingType[]
}

const BookingList = ({
  confirmedBookings,
  concludedBookings,
}: BookingListProps) => {
  const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(
    null,
  )

  const handleSelectBooking = (booking: BookingType) => {
    setSelectedBooking(booking)
  }

  return (
    <div className="flex w-full justify-center gap-[2.78%] py-10">
      <div className="w-[444px] space-y-5">
        <h1 className="text-2xl font-bold">Agendamentos</h1>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Você não tem agendamentos.</p>
        )}

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>

            <ScrollArea
              className={`${
                concludedBookings.length > 0 ? "h-[330px]" : "h-[696px]"
              } w-[444px] rounded-md border`}
            >
              <div className="space-y-1">
                {confirmedBookings.map((booking) => (
                  <div
                    key={booking.id}
                    onClick={() => handleSelectBooking(booking)}
                    className="cursor-pointer rounded-md p-0.5 hover:bg-primary"
                  >
                    <BookingItem
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            <ScrollArea
              className={`${
                confirmedBookings.length > 0 ? "h-[330px]" : "h-[696px]"
              } w-[444px] rounded-md border`}
            >
              <div className="space-y-1">
                {concludedBookings.map((booking) => (
                  <div
                    key={booking.id}
                    onClick={() => handleSelectBooking(booking)}
                    className="cursor-pointer rounded-md p-0.5 hover:bg-primary"
                  >
                    <BookingItem
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
      <div className="min-w-[444px]">
        {selectedBooking && (
          <div>
            <BookingDetails
              booking={selectedBooking}
              setSelectedBooking={setSelectedBooking}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingList
