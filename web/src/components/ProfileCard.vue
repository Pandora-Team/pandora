<template>
    <div class="profile-card">
        <div @click="changeEdit">
            <simple-svg
                :src="iconPath"
                width="29px"
                height="29px"
                custom-class-name="profile-card__edit"
            />
        </div>
        <div class="profile-row">
            <div class="profile-avatar">
                <lk-avatar :width="widthAvatar" />
            </div>
            <div class="profile-desc">
                <h3>{{ fullName }}</h3>
                <p>День Рождения:&nbsp;<span>{{ birthday }}</span></p>
                <div class="profile-social">
                    <lk-social-item
                        v-for="social in socialLink"
                        :key="social.id"
                        :social="social"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"
import LkSocialItem from "@/components/LkSocialItem.vue"
import { SocialData } from "@/definitions/interfaces"

@Component({
    components: {
        LkAvatar,
        LkSocialItem,
    },
})
export default class ProfileCard extends Vue {

    get socialLink(): SocialData[] {
        return this.$mainStore.user.socialLink
    }

    get fullName(): string {
        return this.$mainStore.user.fullName
    }

    get birthday(): string {
        return this.$mainStore.user.birthday
    }

    get iconPath(): string {
        return require("@/assets/svg/edit-profile.svg")
    }

    get widthAvatar(): string {
        if (window.innerWidth < 500) return "max"
        return "full"
    }

    changeEdit(): void {
        this.$emit("edit", true)
    }


}
</script>

<style lang="scss">
    .profile {
        &-card {
            color: $color-dark;
            position: relative;
            &__edit {
                cursor: pointer;
                position: absolute;
                top: 0;
                right: 0;
            }
            @media all and (max-width: 800px) {
                .profile-row {
                    flex-direction: column;
                }
                .profile-avatar {
                    margin-bottom: 20px;
                    margin-right: 0;
                }
            }
        }
        &-avatar {
            max-width: 238px;
            margin-right: 60px;
            width: 100%;
        }
        &-desc {
            h3 {
                color: inherit;
                margin-bottom: 40px;
                padding-right: 30px;
            }
            p {
                color: $color-gray;
                margin-bottom: 30px;
            }
            span {
                color: $color-black;
                margin-left: 5px;
            }
        }
        &-social {
            display: flex;
            &__item {
                cursor: pointer;
                width: 40px;
                height: 40px;
                margin-right: 20px;
                &:nth-last-of-type(1) {
                    margin-right: 0;
                }
            }
        }
    }
</style>