<template>
    <transition-fade>
        <div class="main-popup">
            <div class="main-popup__wrapper">
                <div
                    class="main-popup__close"
                    @click="closePopup"
                />
                <slot />
            </div>
        </div>
    </transition-fade>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import TransitionFade from "@/components/transition/TransitionFade.vue"


@Component({
    components: {
        TransitionFade,
    },
})
export default class MainPopup extends Vue {

    closePopup(): void {
        this.$emit("close")
    }
}
</script>

<style lang="scss">
    .main-popup {
        width: 100%;
        height: 100%;
        background: $bg-popup;
        position: fixed;
        z-index: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        &__wrapper {
            position: relative;
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.25);
            border-radius: 30px;
        }
        &__close {
            cursor: pointer;
            position: absolute;
            z-index: 2;
            top: 0;
            right: -59px;
            width: 44px;
            height: 44px;
            background: url("../assets/svg/close.svg") center no-repeat;
            background-size: contain;
        }
    }
</style>