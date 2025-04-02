"use server"

import * as serverCookies from "@/utils/server-cookies"
import { ApiResponse, Tokens } from "./types"

const BASE_URL = "http://localhost:8080"

export const createResponse = async (
    data: object, config?: ResponseInit
): Promise<Response> => new Response(JSON.stringify(data), {
    headers: config?.headers ?? { "Content-Type": "application/json" },
    status: config?.status ?? 200,
    statusText: config?.statusText ?? undefined
})

const refresh = async (): Promise<Tokens> => {
    const {
        accessToken,
        refreshToken
    } = await serverCookies.getCookiesLogin()

    const response = await fetch(
        BASE_URL + "/refresh",
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Cookie: (
                    `refresh_token=${refreshToken}; `
                    + `access_token=${accessToken}`
                )
            }
        }
    )

    const data = await response.json() as { accessToken: string }

    if (response.status === 200) {
        await serverCookies.setCookiesLogin({
            accessToken: data.accessToken
        })
    } else {
        await serverCookies.deleteCookiesLogin()
    }

    return {
        refreshToken: refreshToken,
        accessToken: data.accessToken
    }
}

export const post = async <T>(
    url: string,
    body: object,
    config?: Omit<RequestInit, "body" | "method">
): Promise<ApiResponse<T>> => {
    const {
        accessToken,
        refreshToken
    } = await serverCookies.getCookiesLogin()

    const getResponse = async ({
        refreshToken,
        accessToken
    }: Tokens) => await fetch(
        BASE_URL + url,
        {
            ...config,
            method: "POST",
            body: JSON.stringify(body),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...config?.headers,
                Cookie: (
                    `refresh_token=${refreshToken}; `
                    + `access_token=${accessToken}`
                )
            }
        }
    )

    let response = await getResponse({ refreshToken, accessToken })

    if (response.status === 401) {
        const updatedTokens = await refresh()

        response = await getResponse({
            refreshToken: updatedTokens.refreshToken,
            accessToken: updatedTokens.accessToken
        })
    }

    const data = await response.json()

    return {
        status: response.status,
        data: data
    }
}

export const get = async <T>(
    url: string,
    config?: Omit<RequestInit, "body" | "method">
): Promise<ApiResponse<T>> => {
    const {
        accessToken,
        refreshToken
    } = await serverCookies.getCookiesLogin()

    const getResponse = async ({
        accessToken, refreshToken
    }: Tokens) => await fetch(
        BASE_URL + url,
        {
            ...config,
            method: "GET",
            credentials: "include",
            headers: {
                ...config?.headers,
                Cookie: (
                    `refresh_token=${refreshToken}; `
                    + `access_token=${accessToken}`
                )
            }
        }
    )

    let response = await getResponse({ refreshToken, accessToken })

    if (response.status === 401) {
        const updatedTokens = await refresh()

        response = await getResponse({
            refreshToken: updatedTokens.refreshToken,
            accessToken: updatedTokens.accessToken
        })
    }

    const data = await response.json()

    return {
        status: response.status,
        data: data
    }
}
