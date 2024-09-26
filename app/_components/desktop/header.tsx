import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { CalendarIcon, CircleUserRoundIcon } from "lucide-react"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex h-24 flex-row items-center justify-between px-32 py-7">
        <Link href="/">
          <Image alt="FSW Barber" src="/logo.png" width={130} height={22} />
        </Link>

        <div className="flex gap-6">
          <Button variant="ghost" className="gap-2 px-4 py-2 text-sm">
            <CalendarIcon size={16} />
            Agendamentos
          </Button>
          <Button className="gap-2 rounded-xl px-4 py-2 text-sm">
            <CircleUserRoundIcon size={16} />
            Perfil
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
