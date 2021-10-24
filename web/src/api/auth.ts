import api from "./index"

interface AuthData {
    phone: string
    pass: string
}

interface RegData {
    phone: string
    pass: string
    name: string
}

export const auth = (params : AuthData): Promise<any> => api.post("/authorization", params)
export const reg = (params : RegData): Promise<any> => api.post("/registration", params)
export const getUserInfo = (): Promise<any> => api.get("/profile")