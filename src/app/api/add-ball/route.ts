"use server"

import { createResponse, post } from "../index"
import { AddBallResponse, AddBallRequest } from "./types"

export const POST = async (request: Request): Promise<Response> => {
    const {
        ball, iceCreamId
    } = await request.json() as AddBallRequest

    const { data, status } = await post<AddBallResponse>(
        "/add-ball", {
        ball, iceCreamId
    })

    return await createResponse(data, { status })
}
