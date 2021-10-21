import api from "./index"

const BASE_URL = "events"

import { EventData } from "@/constants/interfaces"

export const getAllEvent = () => api.get(`${BASE_URL}`)
export const getEvent = (id: string) => api.get(`${BASE_URL}${id}`)
export const createEvent = (params : EventData) => api.post(`${BASE_URL}`, params)
export const updateEvent = (params: EventData) => api.put(`${BASE_URL}`, params)
export const deleteEvent = (id: string) => api.delete(`${BASE_URL}${id}`)