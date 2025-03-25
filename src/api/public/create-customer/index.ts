"use server"

import { CreateCustomerRequest, CreateCustomerResponse } from "./types"
import { ApiResponse, ApiFinalResponse } from "../../utils"
import { isAxiosError } from "axios"
import { api } from "../api"

export const createCustomer = async ({
    name,
    pass,
    avatar
}: CreateCustomerRequest): Promise<ApiFinalResponse<CreateCustomerResponse>> => {

    try {
        const response = await api.post<ApiResponse<CreateCustomerResponse>>(
            "/create-customer",
            { name, pass, avatar }
        )
        return {
            data: {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            }
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return {
                error: { message: error.response.data.message }
            }
        }
        return {
            error: { message: "Unknown Error" }
        }
    }
}
