"use server"

export interface Tokens {
    accessToken: string | null
    refreshToken: string | null
}

export interface ApiResponse<T> {
    status: number
    data: T
    headers: Headers
}

export type ApiData<T> = T & { message?: string | never }

export type RequestConfig = Omit<RequestInit, "body" | "method">