<template>
    <transition-loading-view>
        <div class="loading-view">
            <div class="loading-view__logo">
                <simple-svg
                    :src="bgPath"
                    width="80px"
                    height="100%"
                />
                <loading-progress
                    :indeterminate="true"
                    :counter-clockwise="false"
                    :hide-background="true"
                    :shape="path"
                    size="64"
                    fill-duration="2"
                />
            </div>
        </div>
    </transition-loading-view>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import TransitionLoadingView from "@/components/transition/TransitionLoadingView.vue"


@Component({
    components: {
        TransitionLoadingView,
    },
})
export default class LoadingView extends Vue {

    path = "M58.4376 28.2741L45.9681 28.2741C45.9681 28.2741 45.2923 35.7734 48.4098 39.658C53.454 45.9437 62.8773 45.0615 67.2131 38.2742C71.1847 32.0572 69.2933 23.0928 64.0122 17.9264C56.5193 10.5963 44.1299 11.3437 38.193 19.9668C34.2882 25.6385 36.5178 37.1885 35.2591 45.9089C34.0236 54.468 24.9901 60.4831 24.9901 60.4831"

    get bgPath(): string {
        return require("@/assets/svg/logo-bg.svg")
    }
}
</script>

<style lang="scss">
    .loading-view {
        position: fixed;
        z-index: 102;
        display: flex;
        justify-content: center;
        align-items: center;
        background: $gradient-loading;
        background-size: 400% 400%;
        width: 100%;
        height: 100vh;
        animation: gradient 10s ease infinite alternate;

        &__logo {
            position: relative;

            .vue-progress-path {
                position: absolute;
                top: -18px;
                left: -35px;
                path {
                    stroke-width: 4px;
                }

                .progress {
                    stroke: white;
                    transition: .5s;
                }
            }
        }
    }

    @keyframes gradient {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
</style>