<template>
    <div
        class="form__item"
        :class="{ 'form__item--pb' : error }"
    >
        <label :for="id">{{ label }}</label>
        <main-input
            :id="id"
            :value="value"
            :type="type"
            @input="changeValue"
        />
        <transition
            name="error"
            mode="out-in"
        >
            <div
                v-if="error"
                class="form__item-error"
            >
                {{ error }}
            </div>
        </transition>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"
import MainInput from "@/components/MainInput.vue"

@Component({
    components: {
        MainInput,
    },
})
export default class BaseFormItem extends Vue {

    @Prop({ type: String, default: "" })
    readonly type!: string

    @Prop({ type: String, default: "" })
    readonly id!: string

    @Prop({ type: String, default: "" })
    readonly value!: string

    @Prop({ type: String, default: "" })
    readonly label!: string

    @Prop({ type: String, default: "" })
    readonly error!: string

    changeValue(value: string): void {
        this.$emit("input", value)
    }

}
</script>

<style lang="scss">

    .form {
        &__item {
            margin-bottom: 40px;
            padding-bottom: 0;
            transition: padding-bottom 1s;
            position: relative;
            margin-right: 40px;
            &:nth-last-of-type(1) {
                margin-right: 0;
            }
            &--pb {
                padding-bottom: 16px;
            }
            &-error {
                font-size: 12px;
                padding-top: 10px;
                position: absolute;
                color: #C03221;
            }
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