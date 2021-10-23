import api from "./index"

const BASE_URL = "events"

import { EventData } from "@/constants/interfaces"

export const getAllEvent = (): Promise<EventData[]> => api.get(`${BASE_URL}`)
export const getEvent = (id: string): Promise<EventData> => api.get(`${BASE_URL}/${id}`)
export const createEvent = (params : EventData): Promise<EventData> => api.post(`${BASE_URL}`, params)
export const updateEvent = (params: EventData): Promise<EventData> => api.put(`${BASE_URL}`, params)
export const deleteEvent = (id: string): Promise<EventData> => api.delete(`${BASE_URL}/${id}`)