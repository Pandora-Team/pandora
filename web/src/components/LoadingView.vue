<template>
    <transition-loading-view>
        <div class="loading-view">
            <div class="loading-view__logo">
                <simple-svg
                    :src="iconPath"
                    width="94px"
                    height="100%"
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
    get iconPath(): string {
        return require("@/assets/svg/logo.svg")
    }
}
</script>

<style lang="scss">
    .loading-view {
        position: relative;
        z-index: 102;
        display: flex;
        justify-content: center;
        align-items: center;
        background: $gradient-loading;
        width: 100%;
        height: 100vh;
    }
</style>