<template>
    <div
        class="hamburger"
        :class="{'hamburger--open': visible}"
        @click="onClick"
    >
        <div />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})
export default class HamburgerIcon extends Vue {

    @Prop({ type: Boolean, default: false })
    visible!: boolean

    onClick(): void {
        this.$emit("show", !this.visible)
    }
}
</script>

<style lang="scss">
    .hamburger {
        width: 29px;
        cursor: pointer;
        &:before,
        &:after,
        div {
            background: $color-white;
            content: "";
            display: block;
            height: 3px;
            border-radius: 37px;
            margin: 7px 0;
            transition: 0.5s;
        }
        &--open {
            &:before {
                transform: translateY(10px) rotate(135deg);
            }
            &:after {
                transform: translateY(-10px) rotate(-135deg);
            }
            div {
                transform: scale(0);
            }
        }
    }
</style>