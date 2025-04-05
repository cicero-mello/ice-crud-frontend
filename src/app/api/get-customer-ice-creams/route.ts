"use server"

import { get, createResponse } from "../index"
import { GetCustomerIceCreamsResponse } from "./types"

export const GET = async (): Promise<Response> => {
    const response = await get<GetCustomerIceCreamsResponse>(
        "/get-customer-ice-creams"
    )

    return await createResponse(
        response.data,
        { status: response.status }
    )
}
