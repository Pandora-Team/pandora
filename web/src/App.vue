<template>
    <div
        id="app"
        class="app"
    >
        <mobile-menu v-if="visibleMenu" />
        <loading-view v-if="loading" />
        <router-view v-else />
        <popup-record v-if="$mainStore.popup.activeRecordPopup" />
        <popup-cancel v-if="$mainStore.popup.activeCancelPopup" />
        <popup-welcome v-if="$mainStore.popup.activeWelcomePopup" />
        <popup-project-info v-if="$mainStore.popup.activeProjectInfoPopup" />
        <popup-payment v-if="$mainStore.popup.activePaymentPopup" />
        <popup-crop-image v-if="$mainStore.popup.activeCropPopup" />
        <popup-update
            v-if="visiblePopupUpdate"
            @close="visiblePopupUpdate = false"
        />
        <popup-remove v-if="$mainStore.popup.activeRemovePopup" />
        <notification />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"
import Notification from "@/components/Notification.vue"
import LoadingView from "@/components/LoadingView.vue"
import MobileMenu from "@/components/MobileMenu.vue"
import PopupRecord from "@/components/PopupRecord.vue"
import PopupCancel from "@/components/PopupCancel.vue"
import PopupWelcome from "@/components/PopupWelcome.vue"
import PopupPayment from "@/components/PopupPayment.vue"
import PopupUpdate from "@/components/PopupUpdate.vue"
import PopupCropImage from "@/components/PopupCropImage.vue"
import PopupRemove from "@/components/PopupRemove.vue"
import PopupProjectInfo from "@/components/PopupProjectInfo.vue"

@Component({
    components: {
        PopupProjectInfo,
        Notification,
        LoadingView,
        MobileMenu,
        PopupRecord,
        PopupCancel,
        PopupWelcome,
        PopupPayment,
        PopupUpdate,
        PopupCropImage,
        PopupRemove,
    },
})
export default class App extends Vue {

    visiblePopupUpdate = false

    created(): void {
        if (this.$workbox) {
            this.$workbox.addEventListener("waiting", () => {
                //this.visiblePopupUpdate = true
                this.$workbox.messageSW({ type: "SKIP_WAITING" })
            })
        }
    }

    mounted(): void {
        this.$mainStore.app.setLoading(true)
    }

    @Watch("$mainStore.app.disable")
    changeDisable(): void {
        const body = document.querySelector("body")
        if (this.$mainStore.app.disable) {
            body!.style.overflow = "hidden"
        } else {
            body!.style.overflow = "auto"
        }
    }

    @Watch("$mainStore.app.loading")
    changeLoading(): void {
        if (this.loading) {
            setTimeout(() => {
                this.$mainStore.app.setLoading(false)
                if (this.$route.query?.welcome === "true") {
                    this.$mainStore.popup.changeActiveWelcomePopup(true)
                }
            }, 3000)
        }
    }

    get visibleMenu(): boolean {
        return this.$mainStore.mobile.visibleMenu
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

