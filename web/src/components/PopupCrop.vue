<template>
    <main-popup @close="closePopup">
        <div class="profile-crop">
            <div class="profile-crop__choose">
                <croppa
                    ref="myCroppa"
                    :width="238"
                    :height="238"
                    placeholder="Выберите изображение"
                    :show-remove-button="false"
                    :placeholder-font-size="16"
                    :quality="1"
                    :prevent-white-space="true"
                    :image-border-radius="40"
                    @file-choose="chooseFile"
                />
            </div>
            <div class="profile-crop__action">
                <button @click="generateImage">
                    Сохранить
                </button>
                <button
                    v-if="hasImage"
                    @click="removeImage"
                >
                    Удалить
                </button>
            </div>
        </div>
    </main-popup>
</template>

<script lang="ts">

import { Component, Vue, Ref } from "vue-property-decorator"
import MainPopup from "@/components/MainPopup.vue"
import EventCard from "@/components/EventCard.vue"
import MainBtn from "@/components/MainBtn.vue"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Croppa from "vue-croppa"

@Component({
    components: {
        MainPopup,
        EventCard,
        MainBtn,
    },
})
export default class PopupCrop extends Vue {

    @Ref("myCroppa")
    readonly croppa!: Croppa.components

    image = ""

    hasImage = false

    chooseFile(): void {
        this.hasImage = true
    }

    async generateImage(): Promise<void> {
        if (!this.hasImage) {
            return
        }
        const blob = await this.croppa.promisedBlob()
        console.log(blob)
    }

    removeImage(): void {
        if (this.hasImage) this.croppa.remove()
    }

    closePopup(): void {
        this.$mainStore.popup.changeActiveCropPopup(false)
    }
}
</script>

<style lang="scss">
    .profile-crop {
        background: $bg-input;
        padding: 60px;
        box-sizing: border-box;
        max-width: 683px;
        width: 100%;
        height: auto;
        border-radius: 25px;
        &__choose {
            margin-bottom: 30px;
        }
        &__action {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
