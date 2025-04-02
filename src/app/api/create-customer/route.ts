"use server"

import { CreateCustomerRequest, CreateCustomerResponse } from "./types"
import * as serverCookies from "@/utils/server-cookies"
import { post, createResponse } from "../index"

export const POST = async (request: Request): Promise<Response> => {
    const {
        name,
        pass,
        avatar
    } = await request.json() as CreateCustomerRequest

    const response = await post<CreateCustomerResponse>("/create-customer", {
        name, pass, avatar
    })

    if(response.status === 201){
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
