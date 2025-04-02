"use server"

import { Avatar } from "@/enums"
import { ApiData } from "../types"

export interface CreateCustomerRequest {
    name: string
    pass: string
    avatar: Avatar
}

export type CreateCustomerResponse = ApiData<{
    accessToken: string
    refreshToken: string
}>
