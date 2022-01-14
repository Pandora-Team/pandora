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
export default class TransitionLoadingView extends Vue {}
</script>

<style lang="scss">
.fade-enter-active {
    transition: opacity .5s;
}
.fade-leave-active {
    transition: opacity 1s;
}
.fade-enter {
    opacity: 0.8;
}
.fade-leave-to {
    opacity: 0;
}
</style>