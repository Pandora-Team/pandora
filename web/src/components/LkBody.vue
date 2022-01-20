<template>
    <div
        class="lk-body__wrapper"
        :class="inlineClass"
    >
        <transition-fade>
            <router-view />
        </transition-fade>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import TransitionFade from "@/components/transition/TransitionFade.vue"
import { styleClassObject } from "@/definitions/interfaces"
import paths from "@/router/paths"

@Component({
    components: {
        TransitionFade,
    },
})
export default class LkBody extends Vue {

    @Prop({ type: Boolean, default: false })
    mobile!: boolean

    isMainLkPage = false

    get inlineClass(): styleClassObject {
        return {
            "lk-body__wrapper--mt":     this.mobile && !this.isMainLkPage,
            "lk-body__wrapper--mt_min": this.mobile && this.isMainLkPage,
        }
    }

    @Watch("$route.path", { immediate: true, deep: true })
    checkMainLkPage(route: string): void {
        this.isMainLkPage = route === paths.LkLayout
    }

}
</script>

<style lang="scss">
    .lk-body__wrapper {
        padding: 30px 40px;
        h1 {
            color: $color-black;
            margin-bottom: 30px;
        }
        &--mt {
            margin-top: 60px;
            @media all and (max-width: 500px) {
                margin-top: 90px;
            }
            &_min {
                margin-top: 60px;
            }
        }
    }
</style>