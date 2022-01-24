<template>
    <div class="profile-card edit">
        <icon-close
            color="red"
            classes="profile-card__close"
            @close="back"
        />
        <div class="profile-row">
            <div
                class="profile-avatar profile-avatar--edit"
                @click="changeAvatar"
            >
                <lk-avatar :width="widthAvatar" />
            </div>
            <div class="profile-column">
                <main-form-item
                    id="name"
                    v-model="name"
                    label="Имя"
                    type="text"
                    placeholder="Имя"
                    inline-class="profile-item"
                />
                <main-form-item
                    id="surname"
                    v-model="surname"
                    label="Фамилия"
                    type="text"
                    placeholder="Фамилия"
                    inline-class="profile-item"
                />
            </div>
        </div>
        <div class="profile-row">
            <main-form-item
                id="birthday"
                v-model="birthday"
                label="Дата рождения"
                type="text"
                placeholder="дд.мм.гггг"
                inline-class="profile-item"
            />
            <main-form-item
                id="vk"
                v-model="vk"
                label="ВКонтакте"
                type="text"
                placeholder="Ссылка"
                inline-class="profile-item"
            />
        </div>
        <div class="profile-row">
            <main-form-item
                id="insta"
                v-model="instagram"
                label="Инстаграм"
                type="text"
                placeholder="Ссылка"
                inline-class="profile-item"
            />
            <main-form-item
                id="tg"
                v-model="telegram"
                label="Телеграм"
                type="text"
                placeholder="Ссылка"
                inline-class="profile-item"
            />
        </div>
        <main-btn
            :full-width="true"
            @click="saveEdit"
        >
            Сохранить
        </main-btn>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"
import LkSocialItem from "@/components/LkSocialItem.vue"
import MainFormItem from "@/components/MainFormItem.vue"
import { updateUser } from "@/api/users"
import { UpdateUserData } from "@/definitions/interfaces"
import MainBtn from "@/components/MainBtn.vue"
import IconClose from "@/components/IconClose.vue"

@Component({
    components: {
        LkAvatar,
        LkSocialItem,
        MainFormItem,
        MainBtn,
        IconClose,
    },
})
export default class ProfileCardEdit extends Vue {

    name = this.$mainStore.user.name

    surname = this.$mainStore.user.surname

    birthday = this.$mainStore.user.birthday

    vk = this.$mainStore.user.vk

    telegram = this.$mainStore.user.telegram

    instagram = this.$mainStore.user.instagram

    get isMobile(): boolean {
        return this.$mainStore.app.isMobile
    }

    get widthAvatar(): string {
        if (window.innerWidth < 500) return "max"
        return "full"
    }

    async saveEdit(): Promise<void> {
        try {
            const userId = this.$mainStore.user.id
            const params: UpdateUserData = {}
            if (this.name) {
                params.name = this.name
                this.$mainStore.user.setName(this.name)
            }
            if (this.surname) {
                params.surname = this.surname
                this.$mainStore.user.setSurname(this.surname)
            }
            if (this.birthday) {
                params.birthday = this.birthday
                this.$mainStore.user.setBirthday(this.birthday)
            }
            if (this.vk) {
                params.vk = this.vk
                this.$mainStore.user.setVk(this.vk)
            }
            if (this.telegram) {
                params.telegram = this.telegram
                this.$mainStore.user.setTelegram(this.telegram)
            }
            if (this.instagram) {
                params.instagram = this.instagram
                this.$mainStore.user.setInstagram(this.instagram)
            }

            await updateUser(userId, params)
            this.$mainStore.notification.changeNotification(
                { state: true, ...this.$mainNotification.successProfileUpdate })
        } catch (e) {
            this.$mainStore.notification.changeNotification(
                { state: true, ...this.$mainNotification.failedProfileUpdate })
            throw new Error(`Update User Info - ${e}`)
        }
        this.$emit("edit", false)
    }

    changeAvatar(): void {
        this.$mainStore.popup.changeActiveCropPopup(true)
    }

    back(): void {
        this.$emit("edit", false)
    }
}
</script>

<style lang="scss">
    .profile {
        &-card {
            &__btn {
                font-weight: 500;
                display: flex;
                align-items: center;
                color: $color-green;
                cursor: pointer;
                position: absolute;
                top: 0;
                right: -30px;
                &-icon {
                    margin-left: 12px;
                }
            }
            &__close {
                cursor: pointer;
                position: absolute;
                z-index: 2;
                top: -10px;
                right: -10px;
                width: 44px;
                height: 44px;
            }
        }
        &-row {
            display: flex;
            margin-bottom: 30px;
            .form__item.profile-item {
                margin-bottom: 0;
                @media all and (max-width: 800px) {
                    width: 100%;
                    max-width: 285px;
                    margin-bottom: 20px;
                    &:nth-last-of-type(1) {
                        margin-bottom: 0;
                    }
                }
                @media all and (max-width: 500px) {
                    max-width: none;
                }
            }
            &:nth-last-of-type(1) {
                margin-bottom: 0;
            }
            @media all and (max-width: 800px) {
                margin-bottom: 20px;
                &:nth-last-of-type(2) {
                    margin-bottom: 30px;
                }
            }
        }
        &-column {
            margin-top: 28px;
            width: 100%;
            max-width: 285px;
            .form__item.profile-item {
                width: 100%;
                margin-bottom: 30px;
                margin-right: 0;
                &:nth-last-of-type(1) {
                    margin-bottom: 0;
                }
                @media all and (max-width: 800px) {
                    margin-bottom: 20px;
                }
            }
            @media all and (max-width: 1400px) {
                width: calc(50% - 20px);
                max-width: none;
            }
            @media all and (max-width: 800px)  {
                width: 100%;
            }

        }
        &-avatar {
            &--edit {
                cursor: pointer;
                position: relative;
                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: $bg-avatar;
                    background-image: url("../assets/svg/edit-photo.svg");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 60px 52px;
                    width: 238px;
                    height: 238px;
                    border-radius: 40px;
                }
                @media all and (max-width: 1400px) {
                    width: calc(50% - 40px);
                }
                @media all and (max-width: 500px) {
                    width: 100%;
                    &::after {
                        width: 117px;
                        height: 117px;
                        border-radius: 30px;
                        background-size: 40px;
                    }
                }
            }
        }
    }
</style>