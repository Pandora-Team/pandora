import api from "./index"

const BASE_URL = "events"

import { EventData } from "@/constants/interfaces"
import { AxiosResponse } from "axios"

export const getAllEvent = (): Promise<AxiosResponse> => api.get(`${BASE_URL}`)
export const getNearestEvent = (): Promise<AxiosResponse> => api.get(`${BASE_URL}/nearest`)
export const createEvent = (params: unknown): Promise<AxiosResponse> =>
    api.post(`${BASE_URL}`, params, { headers: {
        "Content-Type": "multipart/form-data",
    } })
export const updateEvent = (params: EventData): Promise<AxiosResponse> => api.put(`${BASE_URL}`, params)
export const deleteEvent = (id: string): Promise<AxiosResponse> => api.delete(`${BASE_URL}/${id}`)

export const getEventsWithUsers = (): Promise<AxiosResponse> => api.get(`${BASE_URL}/list`)