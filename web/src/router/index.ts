import Vue from "vue"
import VueRouter from "vue-router"
import { Store } from "@/store/store"
import routes from "@/router/routes"
import paths from "@/router/paths"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to) {
        if (to.path === paths.RulesView || to.path === paths.AboutView) {
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

const scrollRoutes: string[] = [paths.RulesView, paths.AboutView]

router.beforeEach(async (to, from, next) => {
    const $mainStore: Store = Vue.prototype.$mainStore

    $mainStore.app.setIsMobile(window.innerWidth <= 800)
    if ($mainStore.mobile.openMobileMenu) {
        $mainStore.mobile.setOpenMobileMenu(false)
    }

    if (openRoutes.includes(to.path)) {
        $mainStore.mobile.setVisibleMobileMenu(false)
        return next()
    } else {
        $mainStore.mobile.setVisibleMobileMenu(true)
    }

    if (scrollRoutes.includes(to.path)) {
        $mainStore.app.setNeedScrollIntoBody(true)
    } else {
        $mainStore.app.setNeedScrollIntoBody(false)
    }

    return next()
})

router.beforeEach(async (to, from, next) => {
    const $mainStore: Store = Vue.prototype.$mainStore
    if (from.path === paths.RegistrationView && to.path === paths.LkLayout) {
        $mainStore.popup.changeActiveWelcomePopup(true)
    }
    return next()
})

export default router
