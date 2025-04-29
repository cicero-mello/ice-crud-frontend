import { ApiData } from "../types"

export interface RenameIceCreamRequest {
    iceCreamId: string
    newIceCreamName: string
}

export type RenameIceCreamResponse = ApiData<{
    message: string
}>
