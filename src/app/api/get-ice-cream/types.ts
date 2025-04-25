import { IceCream } from "@/types"
import { ApiData } from "../types"

export type GetIceCreamResponse = ApiData<{
    iceCream: IceCream
}>
