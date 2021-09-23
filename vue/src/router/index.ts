import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import paths from "@/router/paths"
import names from "@/router/names"
import LoginLayout from "@/layouts/LoginLayout.vue"
import LoginView from "@/views/LoginView.vue"
import RegistrationView from "@/views/RegistrationView.vue"
import AuthenticationView from "@/views/AuthenticationView.vue"
import LkLayout from "@/layouts/LkLayout.vue"
import ProfileView from "@/views/ProfileView.vue"
import PolicyView from "@/views/PolicyView.vue"

Vue.use(VueRouter)

const routes: RouteConfig[] = [
    {
        path:      paths.LkLayout,
        component: LkLayout,
        children:  [
            {
                path:      paths.ProfileView,
                name:      names.ProfileView,
                component: ProfileView,
            },
        ],
    },
    {
        path:      paths.LoginLayout,
        component: LoginLayout,
        children:  [
            {
                path:      "",
                name:      names.LoginView,
                component: LoginView,
            },
            {
                path:      paths.AuthenticationView,
                name:      names.AuthenticationView,
                component: AuthenticationView,
            },
            {
                path:      paths.RegistrationView,
                name:      names.RegistrationView,
                component: RegistrationView,
            },
        ],
    },
    {
        path:      paths.PolicyView,
        name:      names.PolicyView,
        component: PolicyView,
    },
    {
        path:     "*",
        redirect: paths.LoginLayout,
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})

export default router
