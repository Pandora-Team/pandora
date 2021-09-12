import axios from "axios"

const basePath = "http://localhost:5000/auth"

interface AuthData {
    phone: string,
    password: string
}

export const auth = (params : AuthData) => axios.post(`${basePath}`, params)