<template>
    <div
        class="info-banner"
        :class="inlineClass"
    >
        <div class="info-banner__wrapper">
            <div class="info-banner__content">
                <p class="info-banner__title">
                    PANDORA - первые k-pop cover dance классы в Туле!
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"

@Component({
    components: {},
})
export default class InfoBanner extends Vue {

    @Prop({ type: String, default: "", required: true })
    readonly bgClass!: string

    get inlineClass(): string[] {
        return [`info-banner--${this.bgClass}`]
    }

}
</script>

<style lang="scss">
    .info-banner {
        margin-bottom: 30px;
        border-radius: 30px;
        background-image: $gradient-black;
        height: 234px;
        position: relative;
        &__wrapper {
            width: 100%;
            display: flex;
            align-items: center;
            background-image: url("../assets/bg/banner-bg.png");
            background-position:top 0 right 50px;
            background-repeat: no-repeat;
            background-size: contain;
            height: inherit;
        }
        &__content {
            padding-left: 90px;
            max-width: 581px;
        }
        &__title {
            font-size: 30px;
            line-height: 37px;
            color: $color-white;
            font-weight: 700;
            margin-bottom: 0;
        }
        &--somi {
            &::after {
                content: "";
                position: absolute;
                right: -37px;
                bottom: 0;
                width: 476px;
                height: 411px;
                background: url("../assets/bg/somi-bg.png");
            }
        }
    }
</style>