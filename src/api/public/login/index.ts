"use server"

import { ApiResponse, ApiFinalResponse } from "../../utils"
import { LoginRequest, LoginResponse } from "./types"
import { isAxiosError } from "axios"
import { api } from "../api"

export const login = async ({
    name,
    pass
}: LoginRequest): Promise<ApiFinalResponse<LoginResponse>> => {

    try {
        const response = await api.post<ApiResponse<LoginResponse>>(
            "/customer-login",
            { name, pass }
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
