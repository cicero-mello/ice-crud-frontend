"use server"

export interface SetCookiesLoginParams {
    accessToken: string
    refreshToken: string
}

export interface GetCookiesLoginResponse {
    accessToken: string | null
    refreshToken: string | null
}
