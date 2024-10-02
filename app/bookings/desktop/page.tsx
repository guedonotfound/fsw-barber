import BookingList from "@/app/_components/desktop/booking-list"
import Header from "@/app/_components/desktop/header"
import { getConcludedBookings } from "@/app/_data/get-concluded-bookings"
import { getConfirmedBookings } from "@/app/_data/get-confirmed-bookings"
import { authOptions } from "@/app/_lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const DesktopBookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  return (
    <>
      <Header />

      <BookingList
        confirmedBookings={confirmedBookings}
        concludedBookings={concludedBookings}
      />
    </>
  )
}

export default DesktopBookings
