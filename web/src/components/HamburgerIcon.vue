<template>
    <div
        class="hamburger"
        :class="{'hamburger--open': show}"
        @click="onClick"
    >
        <span />
        <span />
        <span />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class HamburgerIcon extends Vue {

    show = false

    onClick(): void {
        this.show = !this.show
        this.$emit("show", this.show)
    }
}
</script>

<style lang="scss">
    .hamburger {
        width: 29px;
        height: 23px;
        position: relative;
        cursor: pointer;
        span {
            transition: 1s;
            position: absolute;
            border-radius: 37px;
            background: $color-white;
            height: 3px;
            width: 29px;
            &:first-of-type {
                top: 0;
            }
            &:nth-last-of-type(1) {
                top: calc(100% - 3px);
            }
            &:nth-of-type(2) {
                top: calc(50% - 1.5px);
            }
        }
        &--open {
            span {
                &:first-of-type {
                    top: calc(50% - 1.5px);
                }
                &:nth-of-type(2) {
                    height: 0;
                }
                &:nth-last-of-type(1) {
                    top: calc(50% - 1.5px);
                }
            }
        }
    }
</style>