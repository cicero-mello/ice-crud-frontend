"use server"

import * as serverCookies from "@/utils/server-cookies"
import { LoginRequest, LoginResponse } from "./types"
import { post, createResponse } from "../index"

export const POST = async (request: Request): Promise<Response> => {
    const { name, pass } = await request.json() as LoginRequest

    const response = await post<LoginResponse>("/customer-login", {
        name, pass
    })

    if(response.status === 200){
        await serverCookies.setCookiesLogin({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
        })
    }

    return await createResponse(
        response.data,
        { status: response.status }
    )
}
