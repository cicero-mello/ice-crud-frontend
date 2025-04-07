"use server"

import { createResponse, post } from "../index"
import { CreateIceCreamRequest, CreateIceCreamResponse } from "./types"

export const POST = async (request: Request): Promise<Response> => {
    const {
        name, balls, cone, cup
    } = await request.json() as CreateIceCreamRequest

    const { data, status } = await post<CreateIceCreamResponse>(
        "/create-ice-cream", {
        name, balls, cone, cup
    })

    return await createResponse(data, { status })
}
