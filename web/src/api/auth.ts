import api from "./index"

const BASE_URL = "auth"

interface AuthData {
    phone: string
    pass: string
}

export const auth = (params : AuthData) => api.post(`${BASE_URL}`, params)