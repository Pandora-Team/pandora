<template>
    <div
        class="form"
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
            <div class="login-action">
                <main-btn @click="submit">
                    {{ submitText }}
                </main-btn>
                <main-btn @click="cancel">
                    {{ cancelText }}
                </main-btn>
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

    submit(): void {
        this.$emit("submit")
    }

    cancel(): void {
        this.$emit("cancel")
    }

}
</script>

<style lang="scss">

.form {
    position: relative;
    transition: 1s;
    margin-bottom: 30px;
    &-row {
        display: flex;
        justify-content: center;
        &:nth-of-type(3) {
            margin-bottom: 30px;
        }
    }
}

</style>