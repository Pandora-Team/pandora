<template>
    <button
        class="btn"
        :class="inlineClass"
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

    @Prop({ type: String, default: "main" })
    view!: string

    @Prop({ type: Boolean, default: false })
    fullWidth!: boolean

    @Prop({ type: Boolean, default: false })
    autoWidth!: boolean

    get inlineClass(): any {
        return [
            {
                "btn--width": this.fullWidth,
                "btn--auto":  this.autoWidth,
            },
            `btn--${this.view}`,
        ]
    }

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
          transition: background-position .5s;
          background: $bg-main-btn;
          background-size: 300% 100%;
          background-position: 0 0;
          &:hover {
              background-position: 50% 0;
          }
      }
      &--error {
          min-width: 260px;
          transition: background-position .5s;
          background: $bg-error-btn;
          background-size: 300% 100%;
          background-position: 0 0;
          &:hover {
              background-position: 50% 0;
          }
      }
      &--width {
          width: 100%;
      }
      &--auto {
          padding: 16px 40px;
          min-width: auto;
          margin-right: 15px;
      }
    }
</style>