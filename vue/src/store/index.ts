import Vue from "vue"
import Vuex from "vuex"
import { createVuexStore } from "vuex-simple"
import { Store } from "@/store/store"

Vue.use(Vuex)

export const instance = new Store()

export default createVuexStore(instance, {
    strict: process.env.NODE_ENV !== "production",
})
