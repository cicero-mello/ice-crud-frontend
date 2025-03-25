"use server"

export interface LoginRequest {
    name: string
    pass: string
}

export interface LoginResponse {
    accessToken: string
    refreshToken: string
}
