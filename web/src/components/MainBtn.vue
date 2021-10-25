<template>
    <button
        class="btn btn--main"
        :class="{'btn--width': fullWidth}"
        @click.prevent="click"
    >
        <slot />
    </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({})
export default class MainBtn extends Vue {

    @Prop({ type: String, default: "button" })
    type!: string

    @Prop({ type: String, default: "" })
    url!: string

    @Prop({ type: Boolean, default: false })
    fullWidth!: boolean

    click(): void {
        if(this.type === "link") {
            this.$router.push({ path: this.url })
        }
        if(this.type === "button") {
            this.$emit("click")
        }
    }

}
</script>

<style lang="scss">
    .btn {
      padding: 16px 54px;
      text-align: center;
      margin-right: 40px;
      &:nth-last-of-type(1) {
        margin-right: 0;
      }
      &--main {
          min-width: 260px;
          background: $bg-main-btn;
      }
      &--error {
        background: $bg-error-btn;
      }
      &--width {
          width: 100%;
      }
    }
</style>