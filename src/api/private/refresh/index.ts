"use server"

import { getCookiesLogin } from "@/utils/cookies"
import { ApiResponse, ApiFinalResponse } from "../../utils"
import { RefreshResponse } from "./types"
import { isAxiosError } from "axios"
import { api } from "@/api/public/api"

export const refresh = async (): Promise<ApiFinalResponse<RefreshResponse>> => {
    try {
        const { refreshToken } = await getCookiesLogin()
        if(!refreshToken) throw Error("Inexistent RefreshToken")

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
