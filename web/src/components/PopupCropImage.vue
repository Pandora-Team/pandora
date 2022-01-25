<template>
    <main-popup
        color-icon-close="white"
        @close="closePopup"
    >
        <div class="profile-crop">
            <h2>Фото профиля</h2>
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
                            alt="Portrait image"
                            :view-mode="2"
                            :auto-crop-area="1"
                        />
                        <div
                            v-if="!hasImage && currentAvatar"
                            class="profile-crop__image-delete__wrapper"
                        >
                            <div
                                class="profile-crop__image-delete"
                                @click="removeAvatar"
                            >
                                Удалить
                            </div>
                        </div>
                    </div>
                </div>
                <div class="profile-crop__item">
                    <div class="profile-crop__content">
                        <p>Загрузите фото:</p>
                        <main-btn
                            :full-width="true"
                            :gradient="true"
                            view="without-bg"
                            @click="showFileChooser"
                        >
                            Загрузить
                        </main-btn>
                        <div
                            v-if="nameFile"
                            class="profile-crop__content-name"
                        >
                            <div class="name-file">
                                {{ nameFile }}
                            </div>
                            <icon-close
                                color="white"
                                classes="name-delete"
                                @close="removeLoadedImg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile-crop__action">
                <main-btn
                    :full-width="true"
                    :loading="loading"
                    @click="cropImage"
                >
                    Сохранить
                </main-btn>
            </div>
        </div>
    </main-popup>
</template>

<script lang="ts">

import { Component, Vue, Ref, Watch } from "vue-property-decorator"
import MainPopup from "@/components/MainPopup.vue"
import MainBtn from "@/components/MainBtn.vue"
import VueCropper, { VueCropperMethods } from "vue-cropperjs"
import "cropperjs/dist/cropper.css"
import { removeAvatar, setAvatar } from "@/api/users"
import LoaderMini from "@/components/LoaderMini.vue"
import IconClose from "@/components/IconClose.vue"

@Component({
    components: {
        MainPopup,
        MainBtn,
        LoaderMini,
        VueCropper,
        IconClose,
    },
})
export default class PopupCropImage extends Vue {

    loading = false

    hasImage = false

    imgSrc = ""

    nameFile = ""

    @Ref("inputFile")
    readonly file!: HTMLInputElement

    @Ref("cropper")
    readonly cropper!: VueCropperMethods

    mounted(): void {
        this.checkAvatar()
    }

    @Watch("$mainStore.popup.activeCropPopup")
    checkActivePopup(): void {
        this.checkAvatar()
    }

    get isMobile(): boolean {
        return this.$mainStore.app.isMobile
    }

    get dynamicText(): string {
        if (this.hasImage) return "Выберите фрагмент:"
        return "Текущее фото:"
    }

    get currentAvatar(): string {
        return this.$mainStore.user.avatar
    }

    checkAvatar(): void {
        if (this.currentAvatar) {
            this.imgSrc = `${process.env.VUE_APP_API_URL}files/${this.currentAvatar}`
            return
        }
        this.imgSrc = require("@/assets/images/not-avatar.png")
    }

    removeLoadedImg(): void {
        this.nameFile = ""
        this.hasImage = false
        this.checkAvatar()
        this.cropper.replace(this.imgSrc)
        this.cropper.destroy()
    }

    async removeAvatar(): Promise<void> {
        const { data } = await removeAvatar(this.currentAvatar)
        if (data) {
            this.$mainStore.user.setAvatar("")
            this.checkAvatar()
        }
    }

    cropImage(): void {
        this.loading = true
        this.cropper.getCroppedCanvas().toBlob(async blob => {
            if (blob) {
                try {
                    const nameFileArr = this.nameFile.split(".")
                    const nameFile = nameFileArr.slice(0, nameFileArr.length - 1).join(".")
                    const formData = new FormData()
                    formData.append("avatar", blob, nameFile)
                    const res = await setAvatar(formData)
                    const { data } = res
                    this.$mainStore.user.setAvatar(data)
                    this.$mainStore.popup.changeActiveCropPopup(false)
                    this.$mainStore.notification.changeNotification(
                        { state: true, ...this.$mainNotification.successAvatarUpdate })
                    this.hasImage = false
                    this.loading = false
                } catch (e) {
                    this.$mainStore.notification.changeNotification(
                        { state: true, ...this.$mainNotification.failedAvatarUpdate })
                    this.loading = false
                    throw new Error(`Set Avatar Error - ${e}`)
                }
            }
        }, "image/jpeg", 0.8)
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
                            this.cropper.initCrop()
                            this.imgSrc = event.target.result
                            this.cropper.replace(event.target.result)
                            this.hasImage = true
                            this.loading = false
                            this.nameFile = file.name
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
        max-height: 84vh;
        overflow-y: auto;
        max-width: none;
        height: auto;
        border-radius: 25px;
        @media all and (max-width: 1000px) {
            width: 625px;
        }
        @media all and (max-width: 500px) {
            width: 100%;
            padding: 20px 40px;
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
            @media all and (max-width: 500px) {
                margin-bottom: 20px;
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
            &-delete__wrapper {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
            &-delete {
                display: inline-block;
                cursor: pointer;
                color: $color-red;
            }
        }
        &__content {
            &-name {
                display: flex;
                align-items: center;
                margin-top: 20px;
                .name-delete {
                    cursor: pointer;
                    margin-top: 5px;
                    margin-left: 10px;
                    svg {
                        width: 20px!important;
                    }
                }
            }
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
