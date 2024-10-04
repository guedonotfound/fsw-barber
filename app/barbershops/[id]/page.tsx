import DesktopBarbershopPage from "./desktop/page"
import MobileBarbershopPage from "./mobile/page"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = ({ params }: BarbershopPageProps) => {
  return (
    <div>
      <div className="block 2md:hidden">
        <MobileBarbershopPage params={params} />
      </div>
      <div className="hidden 2md:block">
        <DesktopBarbershopPage params={params} />
      </div>
    </div>
  )
}

export default BarbershopPage
