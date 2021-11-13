<template>
    <div class="lk-body__wrapper">
        <transition-fade>
            <router-view />
        </transition-fade>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import TransitionFade from "@/components/transition/TransitionFade.vue"

@Component({
    components: {
        TransitionFade,
    },
})
export default class LkBody extends Vue {

}
</script>

<style lang="scss">
    .lk-body__wrapper {
        padding: 30px 40px;
        h1 {
            color: $color-black;
            margin-bottom: 30px;
        }
    }
</style>