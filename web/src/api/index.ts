import axios from "axios"
import router from "@/router"

import { setupCache, ISetupCache } from "axios-cache-adapter"
import names from "@/router/names"

const cache : ISetupCache = setupCache({
    maxAge:  60 * 1000,
    exclude: {
        query: false,
    },
})

const api = axios.create({
    baseURL:         process.env.VUE_APP_API_URL,
    withCredentials: true,
    adapter:         cache.adapter,
})

api.interceptors.response.use(undefined, error => {
    if (error.response && error.response.status === 401) {
        router.replace({ name: names.LoginView })
    }
    return Promise.reject(error.response.data)
})

export default api