import api from "./index"

interface RegData {
    phone: string
    pass: string
    name: string
}

export const create = (params : RegData) => api.post("/register", params)