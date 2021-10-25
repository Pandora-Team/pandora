<template>
    <div class="info-banner">
        <div class="info-banner__text">
            <h1>Привет, {{ name }}!</h1>
            <p>
                Добро пожаловать в PANDORA! Здесь ты можешь записаться на&nbsp;занятия,
                узнать о будущих и прошедших событиях.
            </p>
            <p>Будь в курсе k-pop движухи в Туле.</p>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"

@Component({
    components: {},
})
export default class InfoBanner extends Vue {

    name = ""

    @Watch("$mainStore.user.name", { immediate: true })
    updateName(): void {
        const fullName = this.$mainStore.user.name
        this.name = fullName.split(" ")[1]
    }

}
</script>

<style lang="scss">
    .info-banner {
        margin-bottom: 30px;
        border-radius: 30px;
        padding: 45px 40px;
        background-image: url("../assets/banner/welcome-banner.png"), $gradient-black;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right;
        &__text {
            max-width: 660px;
            h1 {
                text-align: left;
                color: $color-white;
                margin-bottom: 26px;
            }
            p {
                font-size: $font-size-big-text;
                line-height: $line-height-big-text;
                color: $color-white;
                margin-bottom: 14px;
                &:nth-last-of-type(1) {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>