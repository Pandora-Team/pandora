import api from "./index"

const BASE_URL = "places"

interface PlaceData {
    _id: string
    address: string
}

export const getAllPlaces = (): Promise<PlaceData[]> => api.get(`${BASE_URL}`)