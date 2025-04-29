"use server"

import { ApiData } from "../types"

export interface DeleteBallRequest {
    iceCreamBallId: string
}

export type DeleteBallResponse = ApiData<{
    message: string
}>
