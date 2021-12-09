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
import WelcomeView from "@/views/WelcomeView.vue"
import RulesView from "@/views/RulesView.vue"
import StorageView from "@/views/StorageView.vue"
import StudentsView from "@/views/StudentsView.vue"
import ClassesView from "@/views/ClassesView.vue"
import AboutView from "@/views/AboutView.vue"
import ListEventsView from "@/views/ListEventsView.vue"
import ListStudentsView from "@/views/ListStudentsView.vue"

Vue.use(VueRouter)

const routes: RouteConfig[] = [
    {
        path:      paths.LkLayout,
        component: LkLayout,
        children:  [
            {
                path:      "",
                name:      names.WelcomeView,
                component: WelcomeView,
            },
            {
                path:      paths.ProfileView,
                name:      names.ProfileView,
                component: ProfileView,
            },
            {
                path:      paths.ClassesView,
                name:      names.ClassesView,
                component: ClassesView,
            },
            {
                path:      paths.RulesView,
                name:      names.RulesView,
                component: RulesView,
            },
            {
                path:      paths.StorageView,
                name:      names.StorageView,
                component: StorageView,
            },
            {
                path:      paths.AboutView,
                name:      names.AboutView,
                component: AboutView,
            },
            {
                path:      paths.StudentsView,
                name:      names.StudentsView,
                component: StudentsView,
                children:  [
                    {
                        path:      paths.ListEventsView,
                        name:      names.ListEventsView,
                        component: ListEventsView,
                    },
                    {
                        path:      paths.ListStudentsView,
                        name:      names.ListStudentsView,
                        component: ListStudentsView,
                    },
                ],
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
