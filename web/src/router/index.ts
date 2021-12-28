import Vue from "vue"
import VueRouter from "vue-router"
import { Store } from "@/store/store"
import routes from "@/router/routes"
import paths from "@/router/paths"
import { getUserId } from "@/api/auth"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
})

const openRoutes:string[] = [paths.PolicyView, paths.AuthenticationView, paths.RegistrationView, paths.LoginLayout]

router.beforeEach(async (to, from, next) => {
    const $mainStore: Store = Vue.prototype.$mainStore
    if (openRoutes.includes(to.path)) {
        return next()
    }
    if ($mainStore.user.id) {
        await $mainStore.user.getUserInfo()
        return next()
    }
    try {
        const res = await getUserId()
        const { id } = res.data
        $mainStore.user.setUserId(id)
        await $mainStore.user.getUserInfo()
        return next()
    } catch (e) {
        next({ path: paths.LoginLayout })
        throw new Error(`Error Get User Id - ${e}`)
    }
})

export default router
