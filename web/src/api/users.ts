import api from "./index"
import { AxiosResponse } from "axios"
import { UpdateUserData } from "@/definitions/interfaces"

const BASE_URL = "users"

export const getUser = (id : string): Promise<AxiosResponse> => api.get(`${BASE_URL}/${id}`)
export const getStudents = (): Promise<AxiosResponse> => api.get(`${BASE_URL}/students`)
export const updateUser = (id : string, params: UpdateUserData): Promise<AxiosResponse> => api.put(`${BASE_URL}/${id}`, params)

