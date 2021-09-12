import axios from "axios"

const basePath = "http://localhost:5000/users"

interface RegData {
    phone: string,
    password: string,
    name: string
}

export const create = (params : RegData) => axios.post(`${basePath}/create`, params)