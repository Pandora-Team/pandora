<template>
    <div
        class="form"
        :class="inlineClass"
        :style="{maxWidth: widthForm, margin: marginForm}"
    >
        <form
            novalidate
        >
            <div class="form-row">
                <slot name="top" />
            </div>
            <div class="form-row">
                <slot name="center" />
            </div>
            <div class="form-row">
                <slot name="bottom" />
            </div>
            <div class="form-action">
                <main-btn
                    :full-width="!cancelButton"
                    :loading="loading"
                    @click="submit"
                >
                    {{ submitText }}
                </main-btn>
                <main-btn
                    v-if="cancelButton"
                    @click="cancel"
                >
                    {{ cancelText }}
                </main-btn>
            </div>
            <slot name="privacy" />
            <div
                v-if="!cancelButton"
                class="form-cancel"
            >
                <slot name="cancel" />
            </div>
        </form>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"
import MainBtn from "@/components/MainBtn.vue"

@Component({
    components: {
        MainBtn,
    },
})
export default class BaseForm extends Vue {

    @Prop({ type: String, default: "" })
    readonly error!: string

    @Prop({ type: String, default: "" })
    readonly submitText!: string

    @Prop({ type: String, default: "" })
    readonly cancelText!: string

    @Prop({ type: Boolean, default: true })
    readonly cancelButton!: boolean

    @Prop({ type: String, default: "100%" })
    readonly widthForm!: string

    @Prop({ type: String, default: "0 auto" })
    readonly marginForm!: string

    @Prop({ type: String, default: "default" })
    readonly classForm!: string

    @Prop({ type: Boolean, default: false })
    loading!: boolean

    submit(): void {
        this.$emit("submit")
    }

    cancel(): void {
        this.$emit("cancel")
    }

    get inlineClass(): string {
        return `form--${this.classForm}`
    }

}
</script>

<style lang="scss">

.form {
    position: relative;
    transition: 1s;
    margin-bottom: 30px;
    &--create {
        .form-action {
            margin-bottom: 0;
        }
    }
    &-row {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        &:nth-of-type(3) {
            margin-bottom: 30px;
        }
    }
    &-action {
        margin-bottom: 40px;
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: space-between;
    }
    &-cancel {
        position: relative;
        z-index: 1;
        text-align: center;
        p {
            color: white;
        }
        span {
            color: #AD00FF;
            text-decoration: underline;
            cursor: pointer;
        }
    }
}

</style>