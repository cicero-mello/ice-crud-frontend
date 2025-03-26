import axios, { AxiosError, AxiosRequestConfig } from "axios"

const baseURL = process.env.SERVER_URL!

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    }
})

const refreshToken = async ():Promise<string> => {
    try {
        const response = await axios.post(`${baseURL}/refresh`, {
            // Envie os dados necessários para a rota de refresh, como refresh token armazenado
        })
        // Supondo que o novo access token esteja em response.data.accessToken
        return response.data.accessToken
    } catch (error) {
        throw new Error("Erro ao atualizar o token")
    }
}

// Interceptor para tratar respostas com erro de autenticação
api.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const newAccessToken = await refreshToken()

                // Atualiza o header da requisição original com o novo token
                if (originalRequest.headers) {
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
                } else {
                    originalRequest.headers = { "Authorization": `Bearer ${newAccessToken}` }
                }

                // Reexecuta a requisição original com o novo token
                return axios(originalRequest)
            } catch (refreshError) {
                // Aqui você pode redirecionar para login ou lidar de outra forma com a falha
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)
