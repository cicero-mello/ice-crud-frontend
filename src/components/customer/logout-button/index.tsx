"use client"

import { deleteCookiesLogin } from "@/utils/cookies"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export const LogoutButton = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleClick = async () => {
        startTransition(async () => {
            await deleteCookiesLogin()
            router.push("/login")
        })
    }

    return (
        <button
            disabled={isPending}
            onClick={handleClick}
            className={
                "disabled:opacity-30 disabled:pointer-events-none " +
                "transition duration-150 " +
                "cursor-pointer underline w-fit"
            }
        >
            Logout
        </button>
    )
}
