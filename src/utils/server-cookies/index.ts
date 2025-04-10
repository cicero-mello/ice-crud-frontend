"use server"

import { cookies } from "next/headers"
import { GetCookiesLoginResponse, SetCookiesLoginParams } from "./types"

export const setCookiesLogin = async ({
    accessToken,
    refreshToken
}: SetCookiesLoginParams) => {
    const cookiesStore = await cookies()

    if (accessToken) {
        cookiesStore.set("access_token", accessToken, {
            httpOnly: true,
            path: "/"
        })
    }

    if (refreshToken) {
        cookiesStore.set("refresh_token", refreshToken, {
            httpOnly: true,
            path: "/"
        })
    }
}

export const deleteCookiesLogin = async () => {
    const cookiesStore = await cookies()

    cookiesStore.delete("access_token")
    cookiesStore.delete("refresh_token")
}

export const getCookiesLogin = async (): Promise<GetCookiesLoginResponse> => {
    const cookiesStore = await cookies()

    const accessToken = cookiesStore.get("access_token")?.value
    const refreshToken = cookiesStore.get("refresh_token")?.value

    return {
        accessToken: accessToken ?? null,
        refreshToken: refreshToken ?? null
    }
}

export const extractCookieValue = async (
    cookieName: string,
    setCookie: string[]
): Promise<string | null> => {
    for (const cookie of setCookie) {
        const match = cookie.match(new RegExp(`^${cookieName}=([^;]+)`))
        if (match) return match[1]
    }
    return null
}
