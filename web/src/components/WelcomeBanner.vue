<template>
    <div class="welcome-banner-wrapper">
        <div class="welcome-banner">
            <div class="welcome-banner__text">
                <h1>Привет, {{ name }} !</h1>
                <p>
                    Добро пожаловать в PANDORA! Здесь ты можешь записаться на&nbsp;занятия,
                    узнать о будущих и прошедших событиях.
                </p>
                <p>Будь в курсе k-pop движухи в Туле.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({
    components: {},
})
export default class WelcomeBanner extends Vue {

    get name(): string {
        return this.$mainStore.user.name
    }

}
</script>

<style lang="scss">
    .welcome-banner {
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

    @media all and (max-width: 1366px) {
        .welcome-banner {
            background-image: url("../assets/banner/welcome-banner-2.png"), $gradient-black;
            padding: 42px 30px;
            margin-bottom: 20px;

            &__text {
                max-width: calc(100% - 300px);

                h1 {
                    font-size: 24px;
                    line-height: 29px;
                    margin-bottom: 26px;
                }

                p {
                    font-size: 16px;
                    line-height: 20px;
                }
            }
        }
    }

    @media all and (max-width: 1000px) {
        .welcome-banner {
            padding: 32px 30px;
            background-image: url("../assets/banner/welcome-banner-3.png"), $gradient-black;

            &__text {
                max-width: 320px;
            }
        }
    }

    @media all and (max-width: 800px) {
        .welcome-banner-wrapper {
            position: relative;
            margin: 0 -20px 20px;
        }
        .welcome-banner {
            height: 470px;
            background-image: url("../assets/banner/welcome-banner-min.png"), $gradient-black;
            background-position: bottom right;
            background-size: auto;
            position: relative;
            z-index: 3;
        }
    }

    @media all and (max-width: 496px) {
        .welcome-banner-wrapper {
            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                height: 30px;
                width: 100%;
                background: $color-black;
            }
        }
    }
</style>