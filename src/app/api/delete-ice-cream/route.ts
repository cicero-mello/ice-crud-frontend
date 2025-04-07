"use server"

import { DeleteIceCreamRequest, DeleteIceCreamResponse } from "./types"
import { createResponse, del } from "../index"

export const DELETE = async (request: Request): Promise<Response> => {
    const {
        iceCreamId
    } = await request.json() as DeleteIceCreamRequest

    const { data, status } = await del<DeleteIceCreamResponse>(
        "/delete-ice-cream",
        { iceCreamId }
    )

    return await createResponse(data, { status })
}
