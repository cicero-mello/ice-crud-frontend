"use server"

import { createResponse, del } from "../index"
import { DeleteBallRequest, DeleteBallResponse } from "./types"

export const DELETE = async (request: Request): Promise<Response> => {
    const { iceCreamBallId } = await request.json() as DeleteBallRequest

    const { data, status } = await del<DeleteBallResponse>(
        "/delete-ball",
        { iceCreamBallId }
    )

    return await createResponse(data, { status })
}
