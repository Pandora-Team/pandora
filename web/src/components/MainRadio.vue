<template>
    <div class="radio">
        <input
            :id="id"
            type="radio"
            :name="name"
            :value="id"
            :checked="value === id"
            @click="onClick"
        >
        <label
            :for="id"
            class="radio-label"
        >
            {{ text }}
        </label>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({})
export default class MainRadio extends Vue {

    @Prop({ type: String, default: "" })
    value!: string

    @Prop({ type: String, default: "" })
    name!: string

    @Prop({ type: String, default: "" })
    text!: string

    @Prop({ type: String, default: "" })
    id!: string

    onClick(event: { target: HTMLInputElement }): void {
        this.$emit("change-value", event.target.value)
    }

}
</script>

<style lang="scss">
    .radio {
        color: inherit;
        margin-bottom: 10px;
        &:nth-last-of-type(1) {
            margin-bottom: 0;
        }
        &-label {
            color: inherit;
            line-height: $line-height-big-text;
            font-size: $font-size-big-text;
            margin-bottom: 0;
        }
    }
</style>