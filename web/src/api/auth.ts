import api from "./index"
import { AxiosResponse } from "axios"

interface AuthData {
    phone: string
    pass: string
}

interface RegData {
    phone: string
    pass: string
    name: string
    birthday?: string
    surname: string
}

export const auth = (params : AuthData): Promise<AxiosResponse> => api.post("/authorization", params)
export const reg = (params : RegData): Promise<AxiosResponse> => api.post("/registration", params)
export const getUserId = (): Promise<AxiosResponse> => api.get("/profile")
export const checkUser = (): Promise<AxiosResponse> => api.get("/check")
export const logout = (): Promise<AxiosResponse> => api.get("/logout")