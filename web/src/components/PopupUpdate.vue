<template>
    <main-popup @close="closePopup">
        <div class="popup-update">
            <h2>Появилась новая версия приложения</h2>
            <main-btn
                :full-width="true"
                @click="accept"
            >
                Обновить
            </main-btn>
        </div>
    </main-popup>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import MainPopup from "@/components/MainPopup.vue"
import EventCard from "@/components/EventCard.vue"
import MainBtn from "@/components/MainBtn.vue"

@Component({
    components: {
        MainPopup,
        EventCard,
        MainBtn,
    },
})
export default class PopupUpdate extends Vue {

    async accept(): Promise<void> {
        this.$emit("close")
        await this.$workbox.messageSW({ type: "SKIP_WAITING" })
    }

    closePopup(): void {
        this.$emit("close")
    }
}
</script>

<style lang="scss">
    .popup-update {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 60px 40px;
        flex-direction: column;
        background: $bg-popup;
        border-radius: 30px;
        h2 {
            text-align: center;
            margin-bottom: 40px;
        }
    }
</style>
