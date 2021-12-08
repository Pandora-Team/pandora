<template>
    <div
        class="btn-wrapper"
        :class="wrapperClass"
    >
        <button
            class="btn"
            :class="inlineClass"
            @click.prevent="click"
        >
            <slot />
        </button>
    </div>
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

    @Prop({ type: Boolean, default: false })
    gradient!: boolean

    get inlineClass(): any {
        return [
            {
                "btn--auto":  this.autoWidth,
                "btn--width": this.fullWidth,
            },
            `btn--${this.view}`,
        ]
    }

    get wrapperClass(): any {
        return {
            "btn-wrapper--gradient": this.gradient,
            "btn-wrapper--width":    this.fullWidth,
        }
    }

    click(): void {
        if (this.type === "link") {
            this.$router.push({ path: this.url })
        }
        if (this.type === "button") {
            this.$emit("click")
        }
    }

}
</script>

<style lang="scss">
.btn {
    padding: 16px 54px;
    text-align: center;
    &-wrapper {
        margin-right: 40px;
        &:nth-last-of-type(1) {
            margin-right: 0;
        }
        &--gradient {
            display: inline-flex;
            position: relative;
            border-radius: $border-radius-input;
            background: transparent;
            height: 54px;
            width: 262px;
            &::before {
                content: "";
                position: absolute;
                top: -2px;
                bottom: -2px;
                left: -2px;
                right: -2px;
                border-radius: $border-radius-input;
                z-index: 0;
                background: $gradient-btn-without-anim;
                width: 264px;
                height: 56px;
            }
        }
        &--width {
            width: 100%;
        }
        .btn--auto {
            &:nth-last-of-type(1) {
                margin-right: 0;
            }
        }
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

    &--without-bg {
        min-width: 260px;
        background: $bg-input;
        position: absolute;
        z-index: 1;
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