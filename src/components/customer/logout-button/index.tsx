"use client"

import * as serverCookies from "@/utils/server-cookies"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { LogoutButtonProps } from "./types"
import { useQueryClient } from "@tanstack/react-query"

export const LogoutButton = ({
    className = ""
}: LogoutButtonProps) => {
    const queryClient = useQueryClient()
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleClick = async () => {
        startTransition(async () => {
            await serverCookies.deleteCookiesLogin()
            queryClient.clear()
            router.push("/login")
        })
    }

    return (
        <button
            disabled={isPending}
            onClick={handleClick}
            className={className + " button-moss"}
        >
            Logout
        </button>
    )
}
