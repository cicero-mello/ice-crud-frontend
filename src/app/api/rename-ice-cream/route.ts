import { createResponse, patch } from "../"
import { RenameIceCreamRequest } from "./types"

export const PATCH = async (request: Request): Promise<Response> => {
    const {
        iceCreamId,
        newIceCreamName
    } = await request.json() as RenameIceCreamRequest

    const { data, status } = await patch<RenameIceCreamRequest>(
        "/rename-ice-cream",
        { iceCreamId, newIceCreamName }
    )

    return await createResponse(data, { status })
}
