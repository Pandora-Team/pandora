<template>
    <div
        class="main-status"
        :class="`main-status--${type.class}`"
        :style="inlineStyle"
    >
        {{ type.title }}
    </div>
</template>

<script lang="ts">

interface Position {
    left: string
    top: string
}

import { Component, Vue, Prop } from "vue-property-decorator"
import { typeStatus } from "@/constants/typeStatus"
@Component({})
export default class MainStatus extends Vue {

    @Prop({ type: Object, default: {} })
    type!: typeStatus

    @Prop({ type: Object, default: {} })
    position!: Position

    get inlineStyle(): {left: string, top: string} {
        return {
            left: this.position.left,
            top:  this.position.top,
        }
    }

}
</script>

<style lang="scss">
   .main-status {
       font-size: $font-size-status;
       line-height: $line-height-status;
       padding: 10px;
       color: $color-text-status;
       position: absolute;
       top: 0;
       left: 0;
       border-radius: $border-radius-status;
       &--success {
            background: $bg-success-status;
       }
       &--payment {
            background: $bg-payment-status;
       }
       &--failure {
            background: $bg-error-status;
       }
   }
</style>