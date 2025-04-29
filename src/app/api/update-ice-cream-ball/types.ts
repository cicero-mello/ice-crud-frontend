"use server"

import { ApiData } from "../types"
import { IceCreamBall } from "@/types"

export interface UpdateIceCreamBallRequest {
    iceCreamId: string
    ball: IceCreamBall
}

export type UpdateIceCreamBallResponse = ApiData<{
    message: string
}>
