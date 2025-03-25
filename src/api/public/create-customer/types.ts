"use server"

import { Avatar } from "@/enums"

export interface CreateCustomerRequest {
    name: string
    pass: string
    avatar: Avatar
}

export interface CreateCustomerResponse {
    accessToken: string
    refreshToken: string
}
