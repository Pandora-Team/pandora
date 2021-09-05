import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Auth from "../views/Auth.vue"
import Lk from "../views/Lk.vue"
import Login from "@/views/Login.vue"
import Reg from "@/views/Reg.vue"
import Profile from "@/components/Profile.vue"

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
        path:      "/login",
        name:      "login",
        component: Login,
    },
    {
        path:      "/auth",
        name:      "auth",
        component: Auth,
    },
    {
        path:      "/reg",
        name:      "reg",
        component: Reg,
    },
    {
        path:     "*",
        redirect: "/auth",
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})

export default router
