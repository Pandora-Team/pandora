<template>
    <div
        class="base-form"
        :class="classes"
    >
        <form
            class="form"
            novalidate
        >
            <slot />
            <div class="form-action">
                <base-button
                    :view="viewButton.First"
                    class="submit-btn"
                    :disabled="loading"
                    @click="submit"
                >
                    {{ textSubmitBtn }}
                </base-button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import BaseButton from "@/components/new/buttons/base-button.vue"
import { ViewButton } from "@/components/new/buttons/interfaces"

@Component({
    components: {
        BaseButton,
    },
})
export default class BaseForm extends Vue {

    @Prop({ type: String })
    readonly textSubmitBtn!: string

    @Prop({ type: Boolean, default: false })
    readonly loading!: boolean

    @Prop({ type: String, default: "" })
    readonly classes!: string

    viewButton = ViewButton

    submit(): void {
        this.$emit("submit")
    }

}
</script>

<style lang="scss" scoped>
.base-form {
    .submit-btn {
        margin-bottom: 20px;
    }
}
</style>
