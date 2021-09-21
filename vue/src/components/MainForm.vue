<template>
    <div
        class="form"
        :class="{'form--pt': error}"
    >
        <transition
            name="error"
            mode="out-in"
        >
            <div
                v-if="error"
                class="form-error form-error--title"
            >
                {{ error }}
            </div>
        </transition>
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
    &-row {
        display: flex;
        justify-content: space-between;
        &:nth-last-of-type(1) {
            margin-bottom: 30px;
        }
    }
    &-error {
        position: absolute;
        top: 0;
        color: #C03221;
        &--title {
            font-size: 20px;
        }
    }
    &--pt {
        padding-top: 30px;
    }
}

.error-enter-active,
.error-leave-active {
    transition: opacity 1s;
}
.error-enter,
.error-leave-to {
    opacity: 0;
}

</style>