"use client"

import { LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Session } from "next-auth"

interface ProfileMenuProps {
  session: Session
}

const ProfileMenu = ({ session }: ProfileMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-full items-center gap-2 px-2"
          variant="outline"
        >
          <Avatar>
            <AvatarImage
              src={session?.user?.image ?? ""}
              alt="Avatar"
              className="object-cover"
            />
          </Avatar>
          <div className="text-left">
            <p className="font-bold">{session?.user?.name}</p>
            <p className="text-xs">{session?.user?.email}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[195.52px]">
        <DropdownMenuLabel className="pl-2">Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2" onClick={() => signOut()}>
            <LogOutIcon size={16} />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileMenu
