<template>
    <main-popup @close="closePopup">
        <div class="profile-crop">
            <croppa ref="myCroppa" />
            <button @click="generateImage">
                Сохранить
            </button>
        </div>
    </main-popup>
</template>

<script lang="ts">

import { Component, Vue, Ref } from "vue-property-decorator"
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
export default class PopupCrop extends Vue {

    @Ref("myCroppa")
    readonly croppa!: HTMLDivElement

    image = ""

    generateImage(): void {
        const url = this.croppa.generateDataUrl()
        if (!url) {
            alert("no image")
            return
        }
        this.image = url
    }

    closePopup(): void {
        this.$mainStore.popup.changeActiveWelcomePopup(false)
    }
}
</script>

<style lang="scss">

</style>
