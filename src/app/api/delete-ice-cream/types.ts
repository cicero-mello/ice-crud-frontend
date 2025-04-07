"use server"

import { ApiData } from "../types"

export interface DeleteIceCreamRequest {
    iceCreamId: string
}

export type DeleteIceCreamResponse = ApiData<{
    message: string
}>
