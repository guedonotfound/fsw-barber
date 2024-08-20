"use client"

import { useSession } from "next-auth/react"

export function useUserSession() {
  const { data } = useSession()

  return {
    data,
  }
}
