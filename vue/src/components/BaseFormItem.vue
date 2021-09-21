<template>
    <div
        class="form__item"
        :class="{ 'form__item--pb' : error }"
    >
        <label :for="id">{{ label }}</label>
        <input
            :id="id"
            :value="value"
            :type="type"
            autocomplete="off"
            @input="$emit('input', $event.target.value)"
        >
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

@Component({})
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

}
</script>

<style lang="scss">

    .form {
        &__item {
            margin-bottom: 20px;
            padding-bottom: 0;
            transition: padding-bottom 1s;
            position: relative;
            &--pb {
                padding-bottom: 16px;
            }
            &-error {
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