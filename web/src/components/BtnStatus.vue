<template>
    <div
        class="btn-status"
        :class="inlineClass"
        @click="onClick"
    >
        {{ status.title }}
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop, Watch } from "vue-property-decorator"
import { typeStatus } from "@/definitions/typeStatus"
@Component({})
export default class BtnStatus extends Vue {

    @Prop({ type: Object, default: {} })
    status!: typeStatus

    @Prop({ type: String, default: "btn" })
    type!: string

    @Prop({ type: String, default: "" })
    path!: string

    active = false

    @Watch("$route.path", { immediate: true, deep: true })
    changeActive(route: string): void {
        this.active = route === this.path
    }

    get inlineClass(): string {
        let inlineClass = ""
        if (this.type === "link") {
            inlineClass += this.active ? "" : "btn-status--disabled"
        }
        inlineClass += ` btn-status--${this.status.class}`
        return inlineClass
    }

    onClick(): void {
        if (this.type !== "link") {
            this.$emit("click", this.status)
            return
        }

        this.$router.push({ path: this.path })

    }

}
</script>

<style lang="scss">
   .btn-status {
       margin-right: 20px;
       font-size: $font-size-status;
       line-height: $line-height-status;
       padding: 10px;
       color: $color-text-status;
       border-radius: $border-radius-status;
       display: inline-block;
       cursor: pointer;
       &:nth-last-of-type(1) {
           margin-right: 0;
       }
       &--disabled {
           background: $color-gray!important;
       }
       &--link {
           background: $color-hover;
           margin-right: 30px;
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
   }
</style>