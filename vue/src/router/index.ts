import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Lk from "../views/Lk.vue"
import Login from "@/views/Login.vue"
import Profile from "@/components/Profile.vue"
import Auth from "@/components/Auth.vue"
import Reg from "@/components/Reg.vue"
import LoginDefault from "@/components/LoginDefault.vue"
import paths from "@/router/paths"
import names from "@/router/names"

Vue.use(VueRouter)

const routes: RouteConfig[] = [
    {
        path:      "/lk",
        name:      "lk",
        component: Lk,
        children:  [
            {
                path:      "profile",
                name:      "profile",
                component: Profile,
            },
        ],
    },
    {
        path:      paths.Login,
        name:      names.Login,
        component: Login,
        children:  [
            {
                path:      "",
                name:      names.LoginDefault,
                component: LoginDefault,
            },
            {
                path:      paths.Auth,
                name:      names.Auth,
                component: Auth,
            },
            {
                path:      paths.Reg,
                name:      names.Reg,
                component: Reg,
            },
        ],
    },
    {
        path:     "*",
        redirect: paths.Login,
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})

export default router
