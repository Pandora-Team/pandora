<template>
    <div
        class="lk-body__wrapper"
        :class="{'lk-body__wrapper--mt': mobile}"
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
            margin-top: 70px;
        }
    }
</style>