<template>
    <div class="profile-card">
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
export default class ProfileCard extends Vue {

    socialData = [
        { id: 1, path: "https://vk.com/pandoradancetula", icon: "vk" },
        { id: 2, path: "https://www.youtube.com/channel/UC34aTu0MKa6bNHwg91BqFPg", icon: "telegram" },
        { id: 3, path: "https://www.instagram.com/pandora.kpop.dance/", icon: "inst" },
    ]

}
</script>

<style lang="scss">
    .profile {
        &-card {
            max-width: 620px;
            width: 100%;
            color: $color-dark;
            display: flex;
            background: $bg-info;
            border-radius: 30px;
            padding: 30px 40px;
            margin-right: 40px;
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