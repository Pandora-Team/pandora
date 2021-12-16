<template>
    <div class="social">
        <div class="social__text">
            Подписывайся:
        </div>
        <lk-social-item
            v-for="social in data"
            :key="social.id"
            :social="social"
        />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkSocialItem from "@/components/LkSocialItem.vue"

@Component({
    components: {
        LkSocialItem,
    },
})
export default class LkSocial extends Vue {

    data = [
        { id: 1, path: "https://vk.com/pandoradancetula", icon: "vk" },
        { id: 2, path: "https://www.instagram.com/pandora.kpop.dance/", icon: "inst" },
        { id: 3, path: "https://www.youtube.com/channel/UC34aTu0MKa6bNHwg91BqFPg", icon: "youtube" },
    ]

}
</script>

<style lang="scss">
    .social {
        display: flex;
        align-items: center;
        &__text {
            color: $color-black;
            margin-right: 20px;
        }
    }

    @media all and (max-width: 1366px) {
        .social {
            &__text {
                display: none;
            }
        }
    }
</style>