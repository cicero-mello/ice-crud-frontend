"use server"

import { Avatar } from "@/enums"
import { ApiData } from "../types"

export type GetCustomerDataResponse = ApiData<{
    id: string
    name: string
    avatar: Avatar
}>
