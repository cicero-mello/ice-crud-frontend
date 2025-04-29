"use server"

import { BallFlavor, Size } from "@/enums"
import { ApiData } from "../types"

export interface AddBallRequest {
    iceCreamId: string
    ball: {
        flavor: BallFlavor
        size: Size
    }
}

export type AddBallResponse = ApiData<{
    message: string
}>
