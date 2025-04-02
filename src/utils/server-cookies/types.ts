"use server"

export interface SetCookiesLoginParams {
    accessToken?: string | null
    refreshToken?: string | null
}

export interface GetCookiesLoginResponse {
    accessToken: string | null
    refreshToken: string | null
}
