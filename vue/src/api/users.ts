import api from "./index";

const BASE_URL = "users"

interface RegData {
    phone: string,
    password: string,
    name: string
}

export const create = (params : RegData) => api.post(`${BASE_URL}/create`, params)