<template>
    <main-popup
        color-icon-close="white"
        @close="closePopup"
    >
        <div class="profile-crop">
            <h2>Портрет профиля</h2>
            <input
                ref="inputFile"
                class="input-file"
                type="file"
                name="image"
                accept="image/*"
                @change="setImage"
            />
            <p>{{ dynamicText }}</p>
            <div class="profile-crop__block">
                <div class="profile-crop__item">
                    <div class="profile-crop__image">
                        <loader-mini v-if="loading" />
                        <vue-cropper
                            ref="cropper"
                            :src="imgSrc"
                            :aspect-ratio="1"
                            alt="Source Image"
                            preview=".preview"
                            :view-mode="2"
                            :auto-crop-area="1"
                        />
                    </div>
                </div>
                <div class="profile-crop__item">
                    <div class="profile-crop__content">
                        <p>Загрузите изображение:</p>
                        <main-btn
                            :full-width="true"
                            @click="showFileChooser"
                        >
                            Загрузить
                        </main-btn>
                    </div>
                    <div
                        v-if="hasImage"
                        class="profile-crop__add"
                    >
                        <main-btn
                            :auto-width="!isMobile"
                            :full-width="isMobile"
                            view="error"
                            @click="clearImg"
                        >
                            Сбросить
                        </main-btn>
                    </div>
                </div>
            </div>
            <div class="profile-crop__action">
                <main-btn
                    :auto-width="!isMobile"
                    :full-width="isMobile"
                    view="error"
                    @click="closePopup"
                >
                    Отменить
                </main-btn>
                <main-btn
                    :auto-width="!isMobile"
                    :full-width="isMobile"
                    @click="cropImage"
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
import MainBtn from "@/components/MainBtn.vue"
import VueCropper, { VueCropperMethods } from "vue-cropperjs"
import "cropperjs/dist/cropper.css"
import { setAvatar } from "@/api/users"
import LoaderMini from "@/components/LoaderMini.vue"

@Component({
    components: {
        MainPopup,
        MainBtn,
        LoaderMini,
        VueCropper,
    },
})
export default class PopupCropImage extends Vue {

    loading = false

    hasImage = false

    imgSrc = "/assets/images/berserk.jpg"

    @Ref("inputFile")
    readonly file!: HTMLInputElement

    @Ref("cropper")
    readonly cropper!: VueCropperMethods

    mounted(): void {
        if (this.currentAvatar) {
            this.imgSrc = `${process.env.VUE_APP_API_URL}files/${this.currentAvatar}`
            return
        }
        this.imgSrc = require("@/assets/images/not-avatar.png")
    }

    get isMobile(): boolean {
        return this.$mainStore.app.isMobile
    }

    get dynamicText(): string {
        if (this.hasImage) return "Выберите фрагмент:"
        return "Текущий портрет:"
    }

    get currentAvatar(): string {
        return this.$mainStore.user.avatar
    }

    clearImg(): void {
        this.cropper.reset()
    }

    cropImage(): void {
        this.cropper.getCroppedCanvas().toBlob(async blob => {
            if (blob) {
                try {
                    const formData = new FormData()
                    formData.append("avatar", blob, "avatar.jpg")
                    const res = await setAvatar(formData)
                    const { data } = res
                    this.$mainStore.user.setAvatar(data)
                    this.$mainStore.popup.changeActiveCropPopup(false)
                    this.$mainStore.notification.changeNotification(
                        { state: true, ...this.$mainNotification.successAvatarUpdate })
                    this.hasImage = false
                } catch (e) {
                    this.$mainStore.notification.changeNotification(
                        { state: true, ...this.$mainNotification.failedAvatarUpdate })
                    throw new Error(`Set Avatar Error - ${e}`)
                }
            }
        })
    }

    setImage(e: {target: HTMLInputElement}): void {
        if (e.target.files?.length) {
            this.loading = true
            const file = e.target.files[0]
            if (file.type.indexOf("image/") === -1) {
                return
            }
            if (typeof FileReader === "function") {
                const reader: FileReader = new FileReader()
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    if (event.target) {
                        if (typeof event.target.result === "string") {
                            this.imgSrc = event.target.result
                            this.cropper.replace(event.target.result)
                            this.hasImage = true
                            this.loading = false
                        }
                    }
                }
                reader.readAsDataURL(file)
            } else {
                this.loading = false
                throw new Error("Не поддерживается File Reader")
            }
        }
    }

    showFileChooser(): void {
        this.file.click()
    }

    closePopup(): void {
        this.$mainStore.popup.changeActiveCropPopup(false)
    }

}
</script>

<style lang="scss">
    .profile-crop {
        background: $bg-input;
        padding: 40px;
        box-sizing: border-box;
        width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        max-width: none;
        height: auto;
        border-radius: 25px;
        @media all and (max-width: 1000px) {
            width: 625px;
        }
        @media all and (max-width: 500px) {
            width: 100%;
            padding: 60px 40px 40px 40px;
        }
        h2 {
            margin-bottom: 30px;
        }
        &__block {
            display: flex;
            margin-bottom: 40px;
            @media all and (max-width: 1000px) {
                flex-direction: column;
            }
        }
        &__item {
            &:first-of-type {
                max-width: 245px;
                width: 100%;
                margin-right: 40px;
                @media all and (max-width: 1000px) {
                    margin: 0 auto 30px;
                }
            }
            &:nth-last-of-type(1) {
                width: 100%;
            }
        }
        &__image {
            width: 245px;
            position: relative;
        }
        &__content {
            margin-bottom: 40px;
        }
        &__action {
            display: flex;
            justify-content: space-between;
            @media all and (max-width: 500px) {
                flex-direction: column;
                .btn-wrapper {
                    margin-right: 0;
                    margin-bottom: 20px;
                    &:nth-last-of-type(1) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
    .input-file {
        display: none;
    }
</style>
