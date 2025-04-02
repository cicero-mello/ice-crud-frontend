"use server"

import { ApiData } from "../types"

export interface LoginRequest {
    name: string
    pass: string
}

export type LoginResponse = ApiData<{
    accessToken: string
    refreshToken: string
}>
