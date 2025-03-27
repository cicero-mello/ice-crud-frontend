import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"
import { refresh } from "./refresh"
import { deleteCookiesLogin, getCookiesLogin, setCookiesLogin } from "@/utils/cookies"

const baseURL = process.env.SERVER_URL!

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    }
})

const onResponseError = async (error: AxiosError) => {
    const isUnauthorized = error.response?.status === 401
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    const isFirstCall = !originalRequest._retry

    if (!isUnauthorized || !isFirstCall) {
        return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
        const { refreshToken } = await getCookiesLogin()
        if (!refreshToken) {
            throw new Error("Inexistent RefreshToken!")
        }

        const { error, data } = await refresh({ refreshToken })

        if (error) {
            throw new Error(error.message)
        }

        if (!!originalRequest.headers) {
            originalRequest.headers.accessToken = data.accessToken
        }
        else {
            originalRequest.headers = { "accessToken": data.accessToken }
        }

        await setCookiesLogin({ refreshToken, accessToken: data.accessToken })

        return axios(originalRequest)

    } catch (refreshError) {
        await deleteCookiesLogin()
        return Promise.reject(refreshError)
    }
}

api.interceptors.response.use(
    response => response,
    onResponseError
)

const onRequestAddAccessToken = async (config: InternalAxiosRequestConfig<any>) => {
    const { accessToken } = await getCookiesLogin()
    if (!accessToken) throw new Error("Inexistent AccessToken")

    config.headers.accessToken = accessToken

    return config
}

api.interceptors.request.use(
    onRequestAddAccessToken,
    (error) => Promise.reject(error)
)
