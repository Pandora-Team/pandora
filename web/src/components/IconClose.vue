<template>
    <div
        class="icon-close"
        :class="inlineClass"
        @click="onClick"
    >
        <simple-svg
            :src="iconPath"
            width="44px"
            height="100%"
        />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"
@Component({})
export default class IconClose extends Vue {

    @Prop({ type: String, default: "white" })
    color!: string

    @Prop({ type: String, default: "" })
    class!: string

    get iconPath(): string {
        return require("@/assets/svg/close.svg")
    }

    get inlineClass(): any {
        return [{
            "icon-close--white": this.color === "white",
            "icon-close--black": this.color === "black",
            "icon-close--red":   this.color === "red",
        },
        this.class,
        ]
    }

    onClick(): void {
        this.$emit("close", true)
    }

}
</script>

<style lang="scss">
   .icon-close {
       &--white {
            path {
                fill: $color-white;
            }
       }
       &--black {
           path {
               fill: $color-black;
           }
       }
       &--red {
           path {
               fill: $color-red;
           }
       }
   }
</style>