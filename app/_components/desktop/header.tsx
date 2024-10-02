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
import Search from "./search"

interface HeaderProps {
  isHomePage?: boolean
}

const Header = async ({ isHomePage }: HeaderProps) => {
  const session = await getServerSession(authOptions)
  return (
    <Card>
      <CardContent className="flex h-24 items-center justify-center gap-[3.05%] p-0 pt-6">
        <Link href="/">
          <div className="relative h-[22px] w-[130px]">
            <Image
              alt="FSW Barber"
              src="/logo.png"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        <div className="block w-[40.49%]">{!isHomePage && <Search />}</div>

        <div className="flex w-[26.6%] items-center gap-[6.27%]">
          <Button
            variant="ghost"
            className="w-[40.47%] gap-2 xl:text-xs 2xl:text-sm"
            asChild
          >
            <Link href="/bookings">
              <div className="hidden xl:block">
                <CalendarIcon size={16} />
              </div>
              Agendamentos
            </Link>
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
            <div className="flex w-[56.27%] items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  alt="Avatar"
                  className="object-cover"
                />
              </Avatar>
              <div>
                <p className="font-bold">{session.user.name}</p>
                <p className="text-xs">{session.user.email}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
