<template>
    <div>
        <div
            v-if="error"
            class="form-error form-error--title"
        >
            {{ error }}
        </div>
        <form
            class="form"
            novalidate
        >
            <slot />
            <button @click.prevent="submit">
                {{ submitText }}
            </button>
            <button @click.prevent="cancel">
                {{ cancelText }}
            </button>
        </form>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})
export default class BaseForm extends Vue {

    @Prop({ type: String, default: "" })
    readonly error!: string

    @Prop({ type: String, default: "" })
    readonly submitText!: string

    @Prop({ type: String, default: "" })
    readonly cancelText!: string

    submit(): void {
        this.$emit("submit")
    }

    cancel(): void {
        this.$emit("cancel")
    }

}
</script>

<style scoped>

</style>