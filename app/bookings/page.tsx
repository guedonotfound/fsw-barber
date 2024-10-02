import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import MobileBookings from "./mobile/page"
import DesktopBookings from "./desktop/page"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }

  return (
    <div>
      <div className="block 2md:hidden">
        <MobileBookings />
      </div>
      <div className="hidden 2md:block">
        <DesktopBookings />
      </div>
    </div>
  )
}

export default Bookings
