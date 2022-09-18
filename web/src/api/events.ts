import api from "./index"

const BASE_URL = "events"

import { AxiosResponse } from "axios"
import { statusData } from "@/definitions/typeStatus"
import { DateData, EventTypeEnum } from "@/definitions/interfaces"

interface CreateEvent {
    type:        EventTypeEnum
    prepayment?: string
    name:        string
    price:       string
    dates:       DateData[]
    place_id:    string
    cover?:      string
    main_event?: string
    recorded?:   string[]
}

export const getAllEvent = (): Promise<AxiosResponse> => api.get(`${BASE_URL}`)
export const getOneEvent = (id: string): Promise<AxiosResponse> => api.get(`${BASE_URL}/${id}`)
export const getNearestEvent = (): Promise<AxiosResponse> => api.get(`${BASE_URL}/nearest`)
export const createEvent = (params: CreateEvent): Promise<AxiosResponse> =>
    api.post(`${BASE_URL}/create`, params)
export const updateEvent = (id: string, params: CreateEvent): Promise<AxiosResponse> => api.put(`${BASE_URL}/${id}`, params)
export const deleteEvent = (id: string): Promise<AxiosResponse> => api.delete(`${BASE_URL}/${id}`)

export const getEventsWithUsers = (): Promise<AxiosResponse> => api.get(`${BASE_URL}/list`)

export const getVisitedEvents = (): Promise<AxiosResponse> => api.get(`${BASE_URL}/visited`)

export const cancelRecordOnEvent = (status_id: string): Promise<AxiosResponse> => api.get(`${BASE_URL}/cancel/${status_id}`)

export const recordOnEvent = (data: statusData): Promise<AxiosResponse> => api.post(`${BASE_URL}/record`, data)

export const createCover = (cover: FormData): Promise<AxiosResponse> => api.post(`${BASE_URL}/cover/create`, cover, { headers: {
    "Content-Type": "multipart/form-data",
} })
export const removeCover = (id: string): Promise<AxiosResponse> => api.delete(`${BASE_URL}/cover/remove/${id}`)