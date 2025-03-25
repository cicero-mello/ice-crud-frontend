"use server"

export interface ApiError {
    message: string
}

export interface SuccessResponse<T> {
    error?: never
    data: T
}

export interface FailureResponse {
    error: ApiError
    data?: never
}

export type ApiFinalResponse<T> = SuccessResponse<T> | FailureResponse

export type ApiResponse<T> = T & { message?: string | never }
