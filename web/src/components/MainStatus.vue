<template>
    <div
        class="main-status"
        :class="`main-status--${status.class}`"
    >
        {{ status.title }}
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"
import { typeStatus } from "@/definitions/typeStatus"
@Component({})
export default class MainStatus extends Vue {

    @Prop({ type: Object, default: {} })
    status!: typeStatus

}
</script>

<style lang="scss">
   .main-status {
       margin-right: 15px;
       font-size: $font-size-status;
       line-height: $line-height-status;
       padding: 10px;
       color: $color-text-status;
       border-radius: $border-radius-status;
       display: inline-block;
       &:nth-last-of-type(1) {
           margin-right: 0;
       }
       &--success {
            background: $bg-success-status;
       }
       &--payment {
            background: $bg-payment-status;
       }
       &--failure {
            background: $bg-error-status;
       }
       @media all and (max-width: 500px) {
           padding: 8px;
           font-size: 12px;
       }
   }
</style>