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
            <h3>Настя Евсикова</h3>
            <p>День Рождения: <span>28.03.1996</span></p>
            <p>Телефон: <span>89190732198</span></p>
            <div class="profile-social">
                <lk-social-item
                    v-for="social in socialData"
                    :key="social.id"
                    :social="social"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"
import LkSocialItem from "@/components/LkSocialItem.vue"

@Component({
    components: {
        LkAvatar,
        LkSocialItem,
    },
})
export default class ProfileCardEdit extends Vue {

    socialData = [
        { id: 1, path: "https://vk.com/pandoradancetula", icon: "vk" },
        { id: 2, path: "https://www.youtube.com/channel/UC34aTu0MKa6bNHwg91BqFPg", icon: "telegram" },
        { id: 3, path: "https://www.instagram.com/pandora.kpop.dance/", icon: "inst" },
    ]

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