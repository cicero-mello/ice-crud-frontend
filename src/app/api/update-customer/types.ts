"use server"

import { Avatar } from "@/enums"
import { ApiData } from "../types"

export interface UpdateCustomerRequest {
    newName: string
    newAvatar: Avatar
    pass: string
}

export type UpdateCustomerResponse = ApiData<{
    message: string
}>
