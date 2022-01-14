import Vue from "vue"
import VueRouter from "vue-router"
import { Store } from "@/store/store"
import routes from "@/router/routes"
import paths from "@/router/paths"
import { checkUser } from "@/api/auth"

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

const loadingRoutes: string[] = [paths.AuthenticationView, paths.RegistrationView, paths.LoginLayout]

const lkRoutes: string[] = [
    paths.RulesView, paths.AboutView, paths.LkLayout, paths.ClassesView, paths.ListEventsView,
    paths.ListStudentsView, paths.ProfileView, paths.StorageView, paths.StudentsView,
]

router.beforeEach(async (to, from, next) => {
    const $mainStore: Store = Vue.prototype.$mainStore

    $mainStore.app.setIsMobile(window.innerWidth <= 800)
    if ($mainStore.mobile.openMobileMenu) {
        $mainStore.mobile.setOpenMobileMenu(false)
    }

    if (openRoutes.includes(to.path)) {
        $mainStore.mobile.setVisibleMobileMenu(false)
    } else {
        $mainStore.mobile.setVisibleMobileMenu(true)
    }

    if (lkRoutes.includes(to.path)) {
        $mainStore.app.setNeedScrollIntoBody(true)
    } else {
        $mainStore.app.setNeedScrollIntoBody(false)
    }

    if (to.path === paths.LoginLayout && lkRoutes.includes(from.path)) {
        $mainStore.app.setLoading(true)
    }

    if (loadingRoutes.includes(to.path)) {
        const { data } = await checkUser()
        if (!data) return next()
        $mainStore.user.setUserId(data)
        await $mainStore.user.getUserInfo()
        return next({ path: paths.LkLayout })
    }

    return next()
})

export default router
