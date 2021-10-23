import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./class-component-hooks"
import { useStore } from "vuex-simple"
import Vuelidate from "vuelidate"
import "./styles/main.scss"
import paths from "@/router/paths"
import { typesStatus } from "@/constants/typeStatus"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from "v-calendar/lib/components/date-picker.umd"

Vue.component("date-picker", DatePicker)

Vue.use(Vuelidate)

Vue.prototype.$mainStore = useStore(store)
Vue.prototype.$mainPaths = paths
Vue.prototype.$typeStatusEvent = typesStatus

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app")

export default Vue
