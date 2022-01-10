<template>
    <transition-fade>
        <div class="main-popup">
            <div class="main-popup__wrapper">
                <icon-close
                    :color="dynamicColorIconClose"
                    classes="main-popup__close"
                    @close="closePopup"
                />
                <slot />
            </div>
        </div>
    </transition-fade>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"
import TransitionFade from "@/components/transition/TransitionFade.vue"
import IconClose from "@/components/IconClose.vue"


@Component({
    components: {
        TransitionFade,
        IconClose,
    },
})
export default class MainPopup extends Vue {

    @Prop({ type: String })
    colorIconClose!: string

    closePopup(): void {
        this.$emit("close")
    }

    get isMobile(): boolean {
        return this.$mainStore.app.isMobile
    }

    get dynamicColorIconClose(): string {
        if (this.colorIconClose) return this.colorIconClose
        if (this.isMobile) return "black"
        return "white"
    }
}
</script>

<style lang="scss">
    .main-popup {
        width: 100%;
        height: 100%;
        background: $bg-popup;
        position: fixed;
        top: 0;
        z-index: 101;
        display: flex;
        justify-content: center;
        align-items: center;
        &__wrapper {
            position: relative;
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.25);
            border-radius: 30px;
            @media all and (max-width: 700px) {
                width: calc(100% - 40px);
                display: flex;
                justify-content: center;
                .btn--main {
                    min-width: auto;
                }
            }
        }
        &__close {
            cursor: pointer;
            position: absolute;
            z-index: 2;
            top: 0;
            right: -59px;
            width: 44px;
            height: 44px;
            @media all and (max-width: 700px) {
                top: 10px;
                right: 10px;
            }
        }
    }
</style>