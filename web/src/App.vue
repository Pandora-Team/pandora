<template>
    <div
        id="app"
        class="app"
    >
        <mobile-menu v-if="visibleMenu" />
        <loading-view v-if="loading" />
        <router-view v-else />
        <popup-record v-if="$mainStore.popup.activeRecordPopup" />
        <popup-create v-if="$mainStore.popup.activeCreatePopup" />
        <popup-cancel v-if="$mainStore.popup.activeCancelPopup" />
        <popup-welcome v-if="$mainStore.popup.activeWelcomePopup" />
        <popup-payment v-if="$mainStore.popup.activePaymentPopup" />
        <popup-crop v-if="$mainStore.popup.activeCropPopup" />
        <notification />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"
import Notification from "@/components/Notification.vue"
import LoadingView from "@/components/LoadingView.vue"
import MobileMenu from "@/components/MobileMenu.vue"
import { Route } from "vue-router"
import names from "@/router/names"
import PopupRecord from "@/components/PopupRecord.vue"
import PopupCreate from "@/components/PopupCreate.vue"
import PopupCancel from "@/components/PopupCancel.vue"
import PopupWelcome from "@/components/PopupWelcome.vue"
import PopupPayment from "@/components/PopupPayment.vue"
import PopupCrop from "@/components/PopupCrop.vue"

@Component({
    components: {
        Notification,
        LoadingView,
        MobileMenu,
        PopupRecord,
        PopupCreate,
        PopupCancel,
        PopupWelcome,
        PopupPayment,
        PopupCrop,
    },
})
export default class App extends Vue {
    @Watch("$mainStore.app.disable")
    changeDisable(): void {
        const body = document.querySelector("body")
        if (this.$mainStore.app.disable) {
            body!.style.overflow = "hidden"
        } else {
            body!.style.overflow = "auto"
        }
    }

    @Watch("$route.path", { immediate: true, deep: true })
    changeApp(): void {
        this.$mainStore.app.setIsMobile(window.innerWidth <= 800)
        if (this.$mainStore.mobile.visibleMobileMenu) {
            this.$mainStore.mobile.setVisibleMobileMenu(false)
        }
    }

    @Watch("$mainStore.app.loading")
    changeLoading(): void {
        if (this.loading) {
            setTimeout(() => {
                this.$mainStore.app.setLoading(false)
            }, 3000)
        }
    }

    @Watch("$route", { immediate: true, deep: true })
    onRouteChange(route: Route): void {
        this.visibleMobileMenu = !(route.name === names.LoginView ||
            route.name === names.AuthenticationView ||
            route.name === names.RegistrationView ||
            route.name === names.PolicyView)
        if (
            route.name === names.AboutView ||
            route.name === names.RulesView
        ) {
            this.$mainStore.app.setNeedScrollIntoBody(true)
        } else {
            this.$mainStore.app.setNeedScrollIntoBody(false)
        }
    }

    visibleMobileMenu = false

    get visibleMenu(): boolean {
        return this.visibleMobileMenu && this.isMobile
    }

    get loading(): boolean {
        return this.$mainStore.app.loading
    }

    get isMobile(): boolean {
        return this.$mainStore.app.isMobile
    }
}
</script>

<style lang="scss">
    .app {
        overflow: hidden;
        position: relative;
    }
</style>

