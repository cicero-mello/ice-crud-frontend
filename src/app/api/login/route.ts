"use server"

import { LoginRequest, LoginResponse } from "./types"
import { post, createResponse } from "../index"
import * as serverCookies from "@/utils/server-cookies"

export const POST = async (request: Request): Promise<Response> => {
    const { name, pass } = await request.json() as LoginRequest

    const { data, status, headers } = await post<LoginResponse>("/customer-login", {
        name, pass
    })

    const setCookie = headers.getSetCookie()

    const accessToken = await serverCookies.extractCookieValue(
        "access_token",
        setCookie
    )

    const refreshToken = await serverCookies.extractCookieValue(
        "refresh_token",
        setCookie
    )

    await serverCookies.setCookiesLogin({
        accessToken,
        refreshToken
    })

    return await createResponse(data, { status })
}
