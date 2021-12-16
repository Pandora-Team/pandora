<template>
    <div
        class="social-item"
        @click="onClick"
    >
        <simple-svg
            :src="iconPath"
            custom-class-name="social-item__icon"
        />
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import { SocialData } from "@/definitions/interfaces"

@Component({
    components: {},
})
export default class LkSocialItem extends Vue {

    @Prop({ type: Object })
    readonly social!: SocialData

    get iconPath(): string {
        return require(`@/assets/svg/icon-${this.social.icon}.svg`)
    }

    onClick(): void {
        window.open(`${this.social.path}`, "_blank")
    }

}
</script>

<style lang="scss">
    .social-item {
        margin-right: 20px;
        height: 40px;
        cursor: pointer;
        &:nth-last-of-type(1) {
            margin-right: 0;
        }
        &__icon {
            width: 40px;
            height: 40px;

            path {
                transition: .5s;
            }
            &:hover {
                path:nth-of-type(1) {
                    fill: $color-lilac;
                }
            }
        }
    }

    @media all and (max-width: 1366px) {
        .social-item {
            height: 35px;

            &__icon {
                width: 35px!important;
                height: 35px!important;;
            }
        }
    }
</style>