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
        &--main {
            min-width: 260px;
            color: $color-text-main-btn;
            background: $gradient-main-btn;
        }
        &--width {
            width: 100%;
        }
    }
</style>