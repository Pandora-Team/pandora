import api from "./index"
import { AxiosResponse } from "axios"

const BASE_URL = "users"

export const getUser = (id : string): Promise<AxiosResponse> => api.get(`${BASE_URL}/${id}`)
export const getStudents = (): Promise<AxiosResponse> => api.get(`${BASE_URL}/students`)

