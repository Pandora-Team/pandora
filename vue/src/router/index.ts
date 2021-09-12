import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Lk from "../views/Lk.vue"
import Login from "@/views/Login.vue"
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
        path:     "*",
        redirect: "/login",
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})

export default router
