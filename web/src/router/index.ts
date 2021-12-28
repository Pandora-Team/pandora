import Vue from "vue"
import VueRouter from "vue-router"
import { Store } from "@/store/store"
import routes from "@/router/routes"
import paths from "@/router/paths"
import { getUserId } from "@/api/auth"
import names from "@/router/names"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to) {
        if (to.name === names.RulesView || to.name === names.AboutView) {
            const scrollBlock = document.querySelector(".lk-body__wrapper--scroll")
            if (scrollBlock) {
                scrollBlock.scrollTo(0, 0)
            }
        }
        return {
            selector: "#app",
            behavior: "smooth",
        }
    },
})

const openRoutes:string[] = [paths.PolicyView, paths.AuthenticationView, paths.RegistrationView, paths.LoginLayout]

router.beforeEach(async (to, from, next) => {
    const $mainStore: Store = Vue.prototype.$mainStore

    if (openRoutes.includes(to.path)) {
        return next()
    }

    $mainStore.app.setIsMobile(window.innerWidth <= 800)
    if ($mainStore.mobile.openMobileMenu) {
        $mainStore.mobile.setOpenMobileMenu(false)
    }
    if (
        to.name === names.AboutView ||
        to.name === names.RulesView
    ) {
        $mainStore.app.setNeedScrollIntoBody(true)
    } else {
        $mainStore.app.setNeedScrollIntoBody(false)
    }
    if (!openRoutes.includes(to.path)) {
        $mainStore.mobile.setVisibleMobileMenu(true)
    } else {
        $mainStore.mobile.setVisibleMobileMenu(false)
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
    } catch (e) {
        next({ path: paths.LoginLayout })
        throw new Error(`Error Get User Id - ${e}`)
    }

    return next()
})

export default router
