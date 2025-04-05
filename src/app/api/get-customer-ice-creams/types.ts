import { IceCream } from "@/types"
import { ApiData } from "../types"

export type GetCustomerIceCreamsResponse = ApiData<{
    iceCreams: IceCream[]
}>
