import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./class-component-hooks"
import { useStore } from "vuex-simple"
import Vuelidate from "vuelidate"
import "./styles/main.scss"
import paths from "@/router/paths"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from "v-calendar/lib/components/date-picker.umd"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SimpleSVG } from "vue-simple-svg"

Vue.use(Vuelidate)

Vue.component("simple-svg", SimpleSVG)
Vue.component("date-picker", DatePicker)

Vue.prototype.$mainStore = useStore(store)
Vue.prototype.$mainPaths = paths

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app")

export default Vue
