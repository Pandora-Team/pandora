import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./class-component-hooks"
import { useStore } from "vuex-simple"
import Vuelidate from "vuelidate"
import "./styles/main.scss"
import paths from "@/router/paths"
import notification from "@/definitions/notification"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from "v-calendar/lib/components/date-picker.umd"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SimpleSVG } from "vue-simple-svg"
import * as Sentry from "@sentry/vue"
import { Integrations } from "@sentry/tracing"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueYoutube from "vue-youtube"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Croppa from "vue-croppa"
import "vue-croppa/dist/vue-croppa.css"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { VueMaskDirective } from "v-mask"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import wb from "./registerServiceWorker"
import "@egjs/vue-flicking/dist/flicking.css"

Vue.use(Vuelidate)
Vue.use(VueYoutube)

Vue.component("simple-svg", SimpleSVG)
Vue.component("date-picker", DatePicker)
Vue.component("croppa", Croppa.component)


Vue.directive("mask", VueMaskDirective)

Vue.prototype.$mainStore = useStore(store)
Vue.prototype.$mainPaths = paths
Vue.prototype.$mainNotification = notification
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Vue.prototype.$workbox = wb

Sentry.init({
    Vue,
    dsn:          "https://d35c5df097054211a4af0f0ae380a149@o1065035.ingest.sentry.io/6056280",
    integrations: [
        new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins:         ["localhost", "my-site-url.com", /^\//],
        }),
    ],
    tracesSampleRate: 1.0,
})

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app")

export default Vue
