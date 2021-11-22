<template>
    <div class="profile-card">
        <div
            class="profile-card__edit"
            @click="changeEdit"
        >
            Сохранить
            <simple-svg
                :src="iconPath"
                width="29px"
                height="29px"
                custom-class-name="profile-card__edit-icon"
            />
        </div>
        <div class="profile-avatar">
            <lk-avatar width="full" />
        </div>
        <div class="profile-desc">
            <main-form-item
                id="name"
                v-model="name"
                label="Имя *"
                type="text"
                placeholder="Имя"
            />
            <main-form-item
                id="surname"
                v-model="surname"
                label="Фамилия *"
                type="text"
                placeholder="Фамилия"
            />
            <main-form-item
                id="phone"
                v-model="phone"
                label="Телефон *"
                type="text"
                placeholder="+79999999999"
            />
            <main-form-item
                id="birthday"
                v-model="birthday"
                label="Дата рождения"
                type="text"
                placeholder="09.09.1999"
            />
            <main-form-item
                id="vk"
                v-model="vk"
                label="Вконтакте *"
                type="text"
                placeholder="Вконтакте"
            />
            <main-form-item
                id="insta"
                v-model="instagram"
                label="Инстаграм *"
                type="text"
                placeholder="Инстаграм"
            />
            <main-form-item
                id="tg"
                v-model="telegram"
                label="Телеграм *"
                type="text"
                placeholder="Телеграм"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"
import LkSocialItem from "@/components/LkSocialItem.vue"
import MainFormItem from "@/components/MainFormItem.vue"

@Component({
    components: {
        LkAvatar,
        LkSocialItem,
        MainFormItem,
    },
})
export default class ProfileCardEdit extends Vue {

    name = ""

    surname = ""

    birthday = ""

    phone = ""

    vk = ""

    telegram = ""

    instagram = ""


    get iconPath(): string {
        return require("@/assets/svg/save-profile.svg")
    }

    changeEdit(): void {
        this.$emit("edit", false)
    }


}
</script>

<style lang="scss">
    .profile {
        &-card {
            color: $color-dark;
            display: flex;
            position: relative;
            &__edit {
                font-weight: 500;
                display: flex;
                align-items: center;
                color: $color-green;
                cursor: pointer;
                position: absolute;
                top: 0;
                right: 0;
                &-icon {
                    margin-left: 12px;
                }
            }
        }
        &-avatar {
            max-width: 238px;
            margin-right: 60px;
        }
        &-desc {
            h3 {
                color: inherit;
                margin-bottom: 40px;
            }
            p {
                color: $color-gray;
                margin-bottom: 30px;
            }
            span {
                color: $color-black;
            }
        }
    }
</style>