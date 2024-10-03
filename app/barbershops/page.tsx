import DesktopBarbershopsPage from "./desktop/page"
import MobileBarbershopsPage from "./mobile/page"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const Bookings = ({ searchParams }: BarbershopsPageProps) => {
  return (
    <div>
      <div className="block 2md:hidden">
        <MobileBarbershopsPage searchParams={searchParams} />
      </div>
      <div className="hidden 2md:block">
        <DesktopBarbershopsPage searchParams={searchParams} />
      </div>
    </div>
  )
}

export default Bookings
