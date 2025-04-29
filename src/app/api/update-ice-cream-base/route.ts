"use server"

import { createResponse, patch } from "../index"
import { UpdateIceCreamBaseRequest, UpdateIceCreamBaseResponse } from "./types"

export const PATCH = async (request: Request): Promise<Response> => {
    const {
        iceCreamId,
        baseType,
        base
    } = await request.json() as UpdateIceCreamBaseRequest

    const { data, status } = await patch<UpdateIceCreamBaseResponse>(
        "/update-ice-cream-base",
        { iceCreamId, baseType, base }
    )

    return await createResponse(data, { status })
}
