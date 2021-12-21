<template>
    <div class="lk">
        <div
            v-if="!isMobile"
            class="lk-aside"
        >
            <lk-logo />
            <lk-nav />
        </div>
        <div class="lk-body">
            <lk-header v-if="!isMobile" />
            <lk-body :mobile="isMobile" />
        </div>
        <popup-record v-if="$mainStore.popup.activeRecordPopup" />
        <popup-create v-if="$mainStore.popup.activeCreatePopup" />
        <popup-cancel v-if="$mainStore.popup.activeCancelPopup" />
        <popup-welcome v-if="$mainStore.popup.activeWelcomePopup" />
        <popup-payment v-if="$mainStore.popup.activePaymentPopup" />
        <popup-crop v-if="$mainStore.popup.activeCropPopup" />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkLogo from "@/components/LkLogo.vue"
import LkBody from "@/components/LkBody.vue"
import LkNav from "@/components/LkNav.vue"
import LkHeader from "@/components/LkHeader.vue"
import { getUserId } from "@/api/auth"
import PopupRecord from "@/components/PopupRecord.vue"
import PopupCreate from "@/components/PopupCreate.vue"
import PopupCancel from "@/components/PopupCancel.vue"
import PopupWelcome from "@/components/PopupWelcome.vue"
import PopupPayment from "@/components/PopupPayment.vue"
import PopupCrop from "@/components/PopupCrop.vue"
import MobileMenu from "@/components/MobileMenu.vue"

@Component({
    components: {
        LkLogo,
        LkBody,
        LkNav,
        LkHeader,
        PopupRecord,
        PopupCreate,
        PopupCancel,
        PopupWelcome,
        PopupPayment,
        PopupCrop,
        MobileMenu,
    },
})
export default class LkLayout extends Vue {

    get userId(): string {
        return this.$mainStore.user.id
    }

    get isMobile(): boolean {
        return this.$mainStore.app.isMobile
    }

    async mounted(): Promise<void> {
        if (this.userId) {
            await this.$mainStore.user.getUserInfo()
            return
        }
        try {
            const res = await getUserId()
            const { id } = res.data
            this.$mainStore.user.setUserId(id)
            await this.$mainStore.user.getUserInfo()
        } catch (e) {
            this.$mainStore.notification.changeNotification({ state: true, ...this.$mainNotification.error })
            throw new Error(`Error Get User Id - ${e}`)
        }
    }
}
</script>

<style lang="scss">
    .lk {
        display: flex;
        min-height: 100vh;
        background-color: $color-black;
        background-image: url("../assets/bg/lk-line.png");
        background-repeat: no-repeat;
        background-position: left bottom;
        background-size: 265px 193px;
        @media all and (max-width: 800px) {
            background-color: $color-white;
        }
        &-aside {
            min-width: 300px;
        }
        &-body {
          width: 100%;
          margin: 40px 40px 40px 0;
          background: $color-white;
          border-radius: 40px;
        }
    }

    @media all and (max-width: 1366px) {
        .lk {
            background-image: none;

            &-body {
                margin: 10px 10px 10px 0;
                border-radius: 0 0 40px 40px;
            }

            &-aside {
                min-width: 200px;
            }
        }
    }

    @media all and (max-width: 1000px) {
        .lk {
            &-body {
                &__wrapper {
                    padding: 20px 30px 50px;
                }
            }

            &-aside {
                min-width: 84px;
            }
        }
    }

    @media all and (max-width: 800px) {
        .lk {
            padding: 20px;
            &-body {
                margin: 0;
                &__wrapper {
                    padding: 0;
                }
            }
        }
    }
</style>