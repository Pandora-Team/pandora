import api from "./index"

const BASE_URL = "events"

import { EventData } from "@/constants/interfaces"

export const getAllEvent = (): Promise<any[]> => api.get(`${BASE_URL}`)
export const getEvent = (id: string): Promise<any> => api.get(`${BASE_URL}/${id}`)
export const getNearestEvent = (): Promise<any> => api.get(`${BASE_URL}/nearest`)
export const createEvent = (params: unknown): Promise<any> =>
    api.post(`${BASE_URL}`, params, { headers: {
        "Content-Type": "multipart/form-data",
    } })
export const updateEvent = (params: EventData): Promise<any> => api.put(`${BASE_URL}`, params)
export const deleteEvent = (id: string): Promise<any> => api.delete(`${BASE_URL}/${id}`)