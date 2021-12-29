import axios from "axios"
import router from "@/router"
import Vue from "vue"

import { setupCache, ISetupCache } from "axios-cache-adapter"
import { Store } from "@/store/store"
import paths from "@/router/paths"

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
        const $mainStore: Store = Vue.prototype.$mainStore
        $mainStore.mobile.setVisibleMobileMenu(false)
        if (router.currentRoute.path !== paths.LoginLayout) {
            router.push({ path: paths.LoginLayout })
        }
    }
    return Promise.reject(error.response.data)
})

export default api