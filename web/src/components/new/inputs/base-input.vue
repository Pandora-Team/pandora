<template>
    <div
        class="base-input"
        :class="{'error': !!error, 'success': isSuccess}"
    >
        <label class="label">
            {{ label }}
        </label>
        <input
            :id="id"
            v-mask="mask"
            class="input"
            type="text"
            :value="value"
            :disabled="disabled"
            :placeholder="placeholder"
            autocomplete="off"
            @focus="focusOnInput"
            @input="$emit('input', $event.target.value)"
        >
        <transition
            name="error-input"
            mode="out-in"
        >
            <div
                v-if="!!error"
                class="error-text"
            >
                {{ error }}
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({
    components: {},
})
export default class BaseInput extends Vue {
    @Prop({ type: String })
    readonly label!: string

    @Prop({ type: String, default: "" })
    readonly id!: string

    @Prop({ type: [String, Number] })
    readonly value!: string | number

    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    @Prop({ type: String, default: "" })
    readonly placeholder!: string

    @Prop({ type: String, default: "" })
    readonly error!: string


    get mask(): string {
        if (this.id === "phone") return "+7-###-###-##-##"
        if (this.id === "birthday") return "##.##.####"
        return ""
    }

    get isSuccess() {
        return !this.error && this.value
    }


    focusOnInput(event: {target: HTMLInputElement}): void {
        if (this.id === "phone") {
            if (!this.value) {
                this.$emit("input", "+7-")
            } else {
                this.$emit("input", event.target.value)
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.base-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    position: relative;
    &.error {
        .input {
            border: 2px solid red;
            background: white;
        }
    }
    &.success {
        .input {
            border: 2px solid greenyellow;
            background: white;
        }
    }
    .label {
        font-size: 14px;
        margin-bottom: 8px;
    }
    .input {
        max-width: 350px;
        padding: 16px 20px;
        color: #242424;
        border-radius: 16px;
        border: 1px solid #242424;
        background: rgba(255, 255, 255, 0.4);
        transition: .5s;
        height: 52px;
        box-sizing: border-box;
        font-size: 14px;
        &::placeholder {
            color: rgba(10, 23, 41, 0.4);
        }
        &:focus {
            background: white;
        }
        &.textarea {
            height: auto;
        }
    }
    .error-text {
        position: absolute;
        bottom: -15px;
        right: 0;
        font-size: 12px;
        color: red;
    }
}

.error-input-enter-active,
.error-input-leave-active {
    transition: opacity 1s;
}
.error-input-enter,
.error-input-leave-to {
    opacity: 0;
}
</style>
