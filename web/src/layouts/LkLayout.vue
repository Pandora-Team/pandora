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
        <event-popup-record v-if="$mainStore.events.activeRecordPopup" />
        <event-popup-create v-if="$mainStore.events.activeCreatePopup" />
        <event-popup-cancel v-if="$mainStore.events.activeCancelPopup" />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkLogo from "@/components/LkLogo.vue"
import LkBody from "@/components/LkBody.vue"
import LkNav from "@/components/LkNav.vue"
import LkHeader from "@/components/LkHeader.vue"
import { getUserId } from "@/api/auth"
import EventPopupRecord from "@/components/EventPopupRecord.vue"
import EventPopupCreate from "@/components/EventPopupCreate.vue"
import EventPopupCancel from "@/components/EventPopupCancel.vue"

@Component({
    components: {
        LkLogo,
        LkBody,
        LkNav,
        LkHeader,
        EventPopupRecord,
        EventPopupCreate,
        EventPopupCancel,
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