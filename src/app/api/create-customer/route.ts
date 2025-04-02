"use server"

import { CreateCustomerRequest, CreateCustomerResponse } from "./types"
import { post, createResponse } from "../index"
import * as serverCookies from "@/utils/server-cookies"

export const POST = async (request: Request): Promise<Response> => {
    const {
        name,
        pass,
        avatar
    } = await request.json() as CreateCustomerRequest

    const { data, status, headers } = await post<CreateCustomerResponse>(
        "/create-customer",
        { name, pass, avatar }
    )

    if (status === 201) {
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
    }

    return await createResponse(data, { status })
}
