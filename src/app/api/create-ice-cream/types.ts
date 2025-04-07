"use server"

import { BallFlavor, Size } from "@/enums"
import { ApiData } from "../types"

export interface CreateIceCreamRequest {
    name: string
    balls: {
        flavor: BallFlavor
        size: Size
    }[]
    cone?: {
        color: string
        size: Size
    }
    cup?: {
        size: Size
    }
}

export type CreateIceCreamResponse = ApiData<{
    message: string
}>
