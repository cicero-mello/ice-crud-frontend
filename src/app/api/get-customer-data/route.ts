"use server"

import { get, createResponse } from "../index"
import { GetCustomerDataResponse } from "./types"

export const GET = async (): Promise<Response> => {
    const response = await get<GetCustomerDataResponse>("/get-customer-data")

    return await createResponse(
        response.data,
        { status: response.status }
    )
}
