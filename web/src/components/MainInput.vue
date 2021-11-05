<template>
    <div class="input-wrapper">
        <input
            :id="id"
            class="input input--main"
            :value="value"
            :type="typeInput"
            :disabled="disabled"
            :placeholder="placeholder"
            autocomplete="off"
            @input="$emit('input', $event.target.value)"
        >
        <div
            v-if="type === 'password'"
            class="eye"
            :class="{'eye--visible': visiblePassword}"
            @click="changeVisiblePassword"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({})
export default class MainInput extends Vue {

    visiblePassword = false

    @Prop({ type: String, default: "" })
    readonly type!: string

    @Prop({ type: String, default: "" })
    readonly id!: string

    @Prop({ type: String, default: "" })
    readonly value!: string

    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    @Prop({ type: String, default: "" })
    readonly placeholder!: string

    changeVisiblePassword(): void {
        this.visiblePassword = !this.visiblePassword
    }

    get typeInput():string {
        if(this.visiblePassword) return "text"
        return this.type
    }

}
</script>

<style lang="scss">
    input {
      display: block;
      border-radius: $border-radius-input;
      padding: 16px 40px;
      border: none;
      outline: none;
    }
    .input-wrapper {
        display: inline-flex;
        position: relative;
        border-radius: $border-radius-input;
        background: transparent;
        height: 52px;
        width: 260px;
        &::before {
            content: "";
            position: absolute;
            top: -2px;
            bottom: -2px;
            left: -2px;
            right: -2px;
            border-radius: $border-radius-input;
            z-index: 0;
            background: $gradient-btn;
        }
        input {
            position: absolute;
            z-index: 1;
            width: 180px;
            background: $bg-input;
        }
    }
    .input--main {
        font-size: 16px;
        line-height: 20px;
        color: $color-white;
    }
    .eye {
        cursor: pointer;
        background-image: url("../assets/svg/eye-close.svg");
        width: 20px;
        height: 24px;
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        right: 20px;
        top: calc(50% - 13px);
        z-index: 2;
        &--visible {
            background-image: url("../assets/svg/eye-open.svg");
        }
    }
</style>