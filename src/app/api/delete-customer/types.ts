"use server"

import { ApiData } from "../types"

export interface DeleteCustomerRequest {
    pass: string
}

export type DeleteCustomerResponse = ApiData<{
    message: string
}>
