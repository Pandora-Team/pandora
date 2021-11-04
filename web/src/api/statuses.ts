import api from "./index"
import { statusData } from "@/constants/typeStatus"
import { AxiosResponse } from "axios"

const BASE_URL = "statuses"

export const createStatuses = (params: statusData): Promise<AxiosResponse> => api.post(`${BASE_URL}`, params)
export const clearStatuses = (id: string): Promise<AxiosResponse> => api.delete(`${BASE_URL}/${id}`)
export const updateStatuses = (id: string, params: statusData): Promise<AxiosResponse> => api.put(`${BASE_URL}/${id}`, params)
