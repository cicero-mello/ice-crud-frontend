"use server"

import { ApiResponse, ApiFinalResponse } from "../../utils"
import { RefreshRequest, RefreshResponse } from "./types"
import { isAxiosError } from "axios"
import { api } from "@/api/public/api"

export const refresh = async ({
    refreshToken
}: RefreshRequest): Promise<ApiFinalResponse<RefreshResponse>> => {
    try {
        const response = await api.get<ApiResponse<RefreshResponse>>(
            "/refresh",
            { headers: { refreshToken: refreshToken } }
        )

        return {
            data: {
                accessToken: response.data.accessToken
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
