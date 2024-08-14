"use client"

import { CopyIcon, MessageCirclePlus, SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import Link from "next/link"

interface PhoneItemProps {
  phone: string
}

const formatPhoneNumber = (phone: string) => {
  return phone.replace(/\D/g, "")
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado!")
  }

  return (
    <div key={phone} className="flex justify-between">
      {/* ESQUERDA */}
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <div className="text-sm">{phone}</div>
      </div>
      {/* DIREITA */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleCopyPhoneClick(phone)}
        >
          <CopyIcon />
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link
            href={`http://wa.me/55${formatPhoneNumber(phone)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCirclePlus />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default PhoneItem
