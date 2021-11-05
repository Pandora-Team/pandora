<template>
    <transition
        name="fade"
        appear
        mode="out-in"
    >
        <slot />
    </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component({})
export default class TransitionFade extends Vue {}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>