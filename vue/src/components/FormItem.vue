<template>
    <div class="form__item">
        <label :for="id">{{ label }}</label>
        <input
            :id="id"
            :value="value"
            :type="type"
            autocomplete="off"
            @input="$emit('input', $event.target.value)"
        >
        <div
            v-if="error"
            class="form-error"
        >
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})
export default class FormItem extends Vue {

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

<style scoped>

</style>