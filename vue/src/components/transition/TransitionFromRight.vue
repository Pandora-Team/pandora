<template>
    <transition
        name="right"
        appear
        mode="in-out"
    >
        <slot />
    </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component({})
export default class TransitionFromRight extends Vue {}
</script>

<style lang="scss">
.right {
    &-enter-active {
        transition: all 1s;
    }
    &-leave-active {
        transition: all .5s;
    }
    &-enter,
    &-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }
    &-leave-to {
    opacity: 0;
    transform: translateY(100%);
    }
}
</style>