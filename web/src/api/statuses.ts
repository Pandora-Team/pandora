import api from "./index"
import { statusData } from "@/constants/typeStatus"

const BASE_URL = "statuses"

export const createStatuses = (params: statusData): Promise<any> => api.post(`${BASE_URL}`, params)
