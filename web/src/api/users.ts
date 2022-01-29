import api from "./index"
import { AxiosResponse } from "axios"
import { UpdateUserData } from "@/definitions/interfaces"

const BASE_URL = "users"

export const getUser = (id : string): Promise<AxiosResponse> => api.get(`${BASE_URL}/${id}`)
export const getStudents = (): Promise<AxiosResponse> => api.get(`${BASE_URL}/students`)
export const updateUser = (id : string, params: UpdateUserData): Promise<AxiosResponse> => api.put(`${BASE_URL}/${id}`, params)
export const setAvatar = (params: FormData, id: string): Promise<AxiosResponse> => api.post(`${BASE_URL}/avatar/${id}`, params)
export const removeAvatar = (id: string): Promise<AxiosResponse> => api.delete(`${BASE_URL}/avatar/${id}`)

