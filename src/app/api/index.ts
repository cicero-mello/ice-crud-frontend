"use server"

import * as serverCookies from "@/utils/server-cookies"
import { ApiResponse, RequestConfig, Tokens } from "./types"

const BASE_URL = "http://localhost:8080"

export const createResponse = async (
    data: object, config?: ResponseInit
): Promise<Response> => new Response(JSON.stringify(data), {
    headers: {
        "Content-Type": "application/json",
        ...config?.headers
    },
    status: config?.status ?? 200,
    statusText: config?.statusText ?? undefined
})

const refresh = async (): Promise<void> => {
    const {
        accessToken,
        refreshToken
    } = await serverCookies.getCookiesLogin()

    const { status, headers } = await fetch(
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

    if (status !== 200) {
        await serverCookies.deleteCookiesLogin()
        return
    }

    const setCookie = headers.getSetCookie()

    const newAccessToken = await serverCookies.extractCookieValue(
        "access_token",
        setCookie
    )

    await serverCookies.setCookiesLogin({
        accessToken: newAccessToken,
        refreshToken: refreshToken
    })
}

const request = async <T>(
    method: "GET" | "POST" | "DELETE" | "PATCH",
    url: string,
    body?: object,
    config?: RequestConfig
): Promise<ApiResponse<T>> => {
    const { accessToken, refreshToken } = await serverCookies.getCookiesLogin()

    const getResponse = async ({
        accessToken, refreshToken
    }: Tokens) => await fetch(
        BASE_URL + url,
        {
            ...config,
            method,
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include",
            headers: {
                "Content-Type": body ? "application/json" : "",
                ...config?.headers,
                Cookie: (
                    `refresh_token=${refreshToken}; `
                    + `access_token=${accessToken}`
                )
            },
        }
    )

    let response = await getResponse({ refreshToken, accessToken })

    if (response.status === 401) {
        await refresh()
        const updatedTokens = await serverCookies.getCookiesLogin()
        response = await getResponse({
            refreshToken: updatedTokens.refreshToken,
            accessToken: updatedTokens.accessToken,
        })
    }

    const data = await response.json()

    return {
        status: response.status,
        headers: response.headers,
        data,
    }
}

export const post = async <T>(
    url: string,
    body: object,
    config?: RequestConfig
) => await request<T>("POST", url, body, config)

export const get = async <T>(
    url: string,
    config?: RequestConfig
) => await request<T>("GET", url, undefined, config)

export const del = async <T>(
    url: string,
    body: object,
    config?: RequestConfig
) => await request<T>("DELETE", url, body, config)

export const patch = async <T>(
    url: string,
    body: object,
    config?: RequestConfig
) => await request<T>("PATCH", url, body, config)
