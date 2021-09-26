import axios from "axios"
// @ts-ignore
import { setupCache, ISetupCache } from "axios-cache-adapter"

const cache : ISetupCache = setupCache({
    maxAge:  60 * 1000,
    exclude: {
        query: false,
    },
})

const api = axios.create({
    baseURL:         process.env.API_URL,
    withCredentials: true,
    adapter:         cache.adapter,
})

export default api