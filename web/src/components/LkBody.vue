<template>
    <div class="lk-body">
        <lk-header />
        <div class="lk-body__wrapper">
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
    .lk-body {
        width: 100%;
        margin: 20px 40px;
        background: #FFFFFF;
        border-radius: 40px;
        &__wrapper {
            padding: 40px;
        }
    }
</style>