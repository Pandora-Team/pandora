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

import { Component, Prop, Vue } from "vue-property-decorator"
import TransitionFade from "@/components/transition/TransitionFade.vue"

@Component({
    components: {
        TransitionFade,
    },
})
export default class LkBody extends Vue {

    @Prop({ type: Boolean, default: false })
    mobile!: boolean

    get inlineClass(): any {
        return {
            "lk-body__wrapper--mt":     this.mobile,
            "lk-body__wrapper--scroll": this.needScroll,
        }
    }

    get needScroll(): boolean {
        return this.$mainStore.app.needScrollIntoBody
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
            margin-top: 100px;
        }
    }
</style>