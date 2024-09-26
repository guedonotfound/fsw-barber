import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { CalendarIcon, CircleUserRoundIcon } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import SignInDialog from "../sign-in-dialog"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/_lib/auth"
import { Avatar, AvatarImage } from "../ui/avatar"

const Header = async () => {
  const session = await getServerSession(authOptions)
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

          {!session?.user ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 rounded-xl px-4 py-2 text-sm">
                  <CircleUserRoundIcon size={16} />
                  Perfil
                </Button>
              </DialogTrigger>
              <DialogContent className="w-auto rounded-lg">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image ?? ""}
                    alt="Avatar"
                    className="object-cover"
                  />
                </Avatar>
                <div>
                  <p className="text-xl font-bold">{session.user.name}</p>
                  <p className="text-xs">{session.user.email}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
