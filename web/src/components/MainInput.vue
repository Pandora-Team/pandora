<template>
    <div class="input-wrapper">
        <input
            :id="id"
            class="input input--main"
            :value="value"
            :type="typeInput"
            :disabled="disabled"
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
    .input-wrapper {
        display: inline-flex;
        position: relative;
        border-radius: 50px;
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
            border-radius: 50px;
            z-index: 0;
            background: linear-gradient(278.56deg, #4430FD -47%, #E03DEE 144.56%);;
        }
        input {
            position: absolute;
            z-index: 1;
            width: 180px;
            background: rgba(23, 23, 30, 1);
        }
    }
    .input--main {
        font-size: 16px;
        line-height: 20px;
        color: white;
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