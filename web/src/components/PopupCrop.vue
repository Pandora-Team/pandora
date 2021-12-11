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
                    @file-choose="chooseFile"
                />
            </div>
            <div
                v-if="hasImage"
                class="profile-crop__action"
            >
                <main-btn
                    view="error"
                    :auto-width="true"
                    @click="removeImage"
                >
                    Удалить
                </main-btn>
                <main-btn
                    :auto-width="true"
                    @click="generateImage"
                >
                    Сохранить
                </main-btn>
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
import { setAvatar } from "@/api/users"

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
        const blob = await this.croppa.promisedBlob("image/jpeg", 1)
        try {
            const formData = new FormData()
            formData.append("avatar", blob, "filename.jpg")
            const res = await setAvatar(formData)
            const { data } = res
            this.$mainStore.user.setAvatar(data)
            this.$mainStore.popup.changeActiveCropPopup(false)
            this.$mainStore.notification.changeNotification(
                { state: true, ...this.$mainNotification.successAvatarUpdate })
        } catch (e) {
            this.$mainStore.notification.changeNotification(
                { state: true, ...this.$mainNotification.failedAvatarUpdate })
            throw new Error(`Set Avatar Error - ${e}`)
        }
    }

    removeImage(): void {
        if (this.hasImage) {
            this.croppa.remove()
            this.hasImage = false
        }
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
        min-width: 476px;
        width: 100%;
        height: auto;
        border-radius: 25px;
        &__choose {
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
        }
        &__action {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .btn-wrapper {

            }
        }
    }
</style>
