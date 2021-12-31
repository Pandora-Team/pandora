<template>
    <div class="welcome-banner-out">
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
    .welcome-banner-wrapper {
        background: $gradient-black;
        margin-bottom: 30px;
        border-radius: 30px;
    }
    .welcome-banner {
        padding: 45px 40px;
        background-image: url("../assets/banner/welcome-banner.png");
        background-size: auto;
        background-repeat: no-repeat;
        background-position: right;
        border-radius: 30px;
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
            background-image: url("../assets/banner/welcome-banner-2.png");
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
            background-image: url("../assets/banner/welcome-banner-3.png");

            &__text {
                max-width: 320px;
            }
        }
    }

    @media all and (max-width: 800px) {
        .welcome-banner-out {
            position: relative;
            margin: 0 -20px 20px;
        }
        .welcome-banner {
            height: 470px;
            background-image: url("../assets/banner/welcome-banner-min.png");
            background-position: bottom right;
            background-size: 338px 313px;
            position: relative;
            z-index: 3;
        }
    }

    @media all and (max-width: 496px) {
        .welcome-banner-out {
            &:before {
                content: "";
                position: absolute;
                top: -10px;
                left: 0;
                height: 40px;
                width: 100%;
                background: $color-black;
            }
        }
        .welcome-banner-wrapper {
            position: relative;
        }
        .welcome-banner {
            box-shadow: $shadow-banner;
        }
    }
</style>