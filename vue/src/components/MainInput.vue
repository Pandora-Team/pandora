<template>
    <div class="input-wrapper">
        <input
            :id="id"
            class="input input--main"
            :value="value"
            :type="type"
            autocomplete="off"
            @input="$emit('input', $event.target.value)"
        >
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({})
export default class MainInput extends Vue {

    @Prop({ type: String, default: "" })
    readonly type!: string

    @Prop({ type: String, default: "" })
    readonly id!: string

    @Prop({ type: String, default: "" })
    readonly value!: string

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
</style>