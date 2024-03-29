<template>
    <div
        class="form__item"
        :class="secondClasses"
    >
        <label>{{ label }}</label>
        <main-input
            :id="id"
            :value="value"
            :type="type"
            :placeholder="placeholder"
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
import { styleClass } from "@/definitions/interfaces"

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

    @Prop({ type: String, default: "" })
    readonly placeholder!: string

    @Prop({ type: String, default: "" })
    readonly inlineClass!: string

    changeValue(value: string): void {
        this.$emit("input", value)
    }
    
    get secondClasses(): styleClass {
        return [
            {
                "form__item--pb": Boolean(this.error),
            },
            this.inlineClass,
        ]
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
            &:nth-of-type(2n) {
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
        &__item.profile-item {
            label {
                color: $color-black;
            }
            .input-wrapper {
                &::before {
                    background: $color-gray;
                }
                input {
                    color: $color-black;
                    background: $bg-info;
                }
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

    @media all and (max-width: 1400px) {
        .form__item {
            width: calc(50% - 20px);
        }
    }

    @media all and (max-width: 500px) {
        .form__item {
            width: 100%;
            margin: 0 0 30px;
        }
    }
</style>