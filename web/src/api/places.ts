import api from "./index"

const BASE_URL = "places"

interface PlaceData {
    _id: string
    address: string
    _v: number
}

export const getAllPlaces = (): Promise<any> => api.get(`${BASE_URL}`)