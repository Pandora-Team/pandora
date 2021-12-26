<template>
    <div
        class="input-wrapper"
        :class="inlineClass"
    >
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
        <div
            v-if="id === 'file'"
            class="file"
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

    get inlineClass(): any {
        return {
            "input-wrapper--file": this.id === "file",
            "input-wrapper--password": this.type === "password",
        }
    }

}
</script>

<style lang="scss">
    .input {
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
            top: -1px;
            bottom: -1px;
            left: -1px;
            right: -1px;
            border-radius: $border-radius-input;
            z-index: 0;
            background: $gradient-btn;
        }
        &--file {
            .input {
                width: 150px;
                padding: 16px 40px 16px 70px;
                @media all and (max-width: 500px) {
                    width: calc(100% - 110px);
                }
            }
        }
        &--password {
            .input {
                width: calc(100% - 110px);
                padding: 16px 70px 16px 40px;
            }
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
    .file {
        width: 20px;
        height: 20px;
        background-image: url("../assets/svg/icon-file.svg");
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        z-index: 1;
        left: 40px;
        top: calc(50% - 12px);
    }

    @media all and (max-width: 1400px) {
        .input-wrapper {
            width: 100%;

            input {
                width: calc(100% - 80px);
            }
        }
    }
    @media all and (max-width: 500px) {
        .input-wrapper {
            input {
                width: calc(100% - 40px);
                padding: 16px 20px;
            }
            &--password {
                .input {
                    width: calc(100% - 90px);
                    padding: 16px 70px 16px 20px;
                }
            }
        }
    }
</style>