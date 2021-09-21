<template>
    <transition
        name="top"
        appear
        mode="out-in"
    >
        <slot />
    </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component({})
export default class TransitionToTop extends Vue {}
</script>

<style lang="scss">
.top {
    &-enter-active,
    &-leave-active {
        transition: all 1s;
    }
    &-enter,
    &-leave-to {
        opacity: 0;
        transform: translateY(100px);
    }
}
</style>