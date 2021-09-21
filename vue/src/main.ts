import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./class-component-hooks"
import { useStore } from "vuex-simple"
import Vuelidate from "vuelidate"
import sanitizeHtml from "sanitize-html"
import "./styles/main.scss"
import paths from "@/router/paths"

Vue.use(Vuelidate)

sanitizeHtml.defaults.allowedAttributes = {}
sanitizeHtml.defaults.allowedTags = ["br", "b", "ul", "ol", "li", "span"]
sanitizeHtml.defaults.selfClosing = ["br"]
sanitizeHtml.defaults.allowedSchemesAppliedToAttributes = []
sanitizeHtml.defaults.disallowedTagsMode = "escape"

Vue.prototype.$mainStore = useStore(store)
Vue.prototype.$mainPaths = paths
Vue.prototype.$sanitizeHtml = sanitizeHtml

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app")

export default Vue
