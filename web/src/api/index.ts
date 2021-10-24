import axios from "axios"

import { setupCache, ISetupCache } from "axios-cache-adapter"

const cache : ISetupCache = setupCache({
    maxAge:  60 * 1000,
    exclude: {
        query: false,
    },
})

const token = localStorage.getItem("at")

const api = axios.create({
    baseURL:         process.env.VUE_APP_API_URL,
    withCredentials: true,
    adapter:         cache.adapter,
    headers:         {
        Authorization: `Bearer ${token}`,
    },
})

export default api