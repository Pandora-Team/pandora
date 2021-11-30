<template>
    <div class="lk">
        <div class="lk-aside">
            <lk-logo />
            <lk-nav />
        </div>
        <div class="lk-body">
            <lk-header />
            <lk-body />
        </div>
        <popup-record v-if="$mainStore.popup.activeRecordPopup" />
        <popup-create v-if="$mainStore.popup.activeCreatePopup" />
        <popup-cancel v-if="$mainStore.popup.activeCancelPopup" />
        <popup-welcome v-if="$mainStore.popup.activeWelcomePopup" />
        <popup-payment v-if="$mainStore.popup.activePaymentPopup" />
        <popup-crop v-if="true" />
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
    },
})
export default class LkLayout extends Vue {

    get userId(): string {
        return this.$mainStore.user.id
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
            console.log(e)
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
</style>