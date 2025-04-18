"use server"

import { createResponse, patch } from "../index"
import { UpdateCustomerResponse, UpdateCustomerRequest } from "./types"

export const PATCH = async (request: Request): Promise<Response> => {
    const {
        pass,
        newAvatar,
        newName
    } = await request.json() as UpdateCustomerRequest

    const { data, status } = await patch<UpdateCustomerResponse>(
        "/update-customer",
        { pass, newAvatar, newName }
    )

    return await createResponse(data, { status })
}
