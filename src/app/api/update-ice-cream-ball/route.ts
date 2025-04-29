"use server"

import { createResponse, patch } from "../index"
import { UpdateIceCreamBallRequest, UpdateIceCreamBallResponse } from "./types"


export const PATCH = async (request: Request): Promise<Response> => {
    const {
        ball,
        iceCreamId
    } = await request.json() as UpdateIceCreamBallRequest

    const { data, status } = await patch<UpdateIceCreamBallResponse>(
        "/update-ice-cream-ball",
        { ball, iceCreamId }
    )

    return await createResponse(data, { status })
}
