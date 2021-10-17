<template>
    <div class="body">
        <lk-header />
        <div class="body-wrapper">
            <transition-fade>
                <router-view />
            </transition-fade>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkHeader from "@/components/LkHeader.vue"
import TransitionFade from "@/components/transition/TransitionFade.vue"

@Component({
    components: {
        LkHeader,
        TransitionFade,
    },
})
export default class LkBody extends Vue {

}
</script>

<style lang="scss">
    .body {
        width: 100%;
        margin: 40px;
        background: #FFFFFF;
        border-radius: 40px;
        &-wrapper {
            padding: 40px;
        }
    }
</style>