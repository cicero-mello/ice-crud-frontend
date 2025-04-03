"use server"

import { DeleteCustomerRequest, DeleteCustomerResponse } from "./types"
import { createResponse, del } from "../index"

export const DELETE = async (request: Request): Promise<Response> => {
    const { pass } = await request.json() as DeleteCustomerRequest

    const { data, status } = await del<DeleteCustomerResponse>(
        "/delete-customer",
        { pass }
    )

    return await createResponse(data, { status })
}
