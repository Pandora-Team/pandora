import api from "./index"
import { AxiosResponse } from "axios"

const BASE_URL = "places"

export const getAllPlaces = (): Promise<AxiosResponse> => api.get(`${BASE_URL}`)