import MobileBookings from "./mobile/page"
import DesktopBookings from "./desktop/page"

const Bookings = async () => {
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
