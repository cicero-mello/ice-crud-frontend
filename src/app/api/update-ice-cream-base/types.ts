"use server"

import { IceCreamBaseType, Size } from "@/enums"
import { ApiData } from "../types"

export interface UpdateIceCreamBaseRequest {
    iceCreamId: string
    baseType: IceCreamBaseType
    base: {
        color?: string
        size: Size
    }
}

export type UpdateIceCreamBaseResponse = ApiData<{
    message: string
}>
