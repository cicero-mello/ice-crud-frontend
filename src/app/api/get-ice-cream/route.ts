"use server"

import { get, createResponse } from "../index"
import { GetIceCreamResponse } from "./types"

export const GET = async (request: Request): Promise<Response> => {
    const { searchParams } = new URL(request.url)
    const iceCreamId = searchParams.get("iceCreamId") ?? ""

    const response = await get<GetIceCreamResponse>(
        `/get-ice-cream?iceCreamId=${iceCreamId}`
    )

    return await createResponse(
        response.data,
        { status: response.status }
    )
}
