<template>
    <div
        class="social-item"
        @click="onClick"
    >
        <simple-svg
            :src="iconPath"
            width="40px"
            height="40px"
            custom-class-name="social-item__icon"
        />
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"

interface SocialData {
    id: number
    path: string
    icon: string
}

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
</style>