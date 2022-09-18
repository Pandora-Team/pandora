<template>
    <button
        :class="customClasses"
        :disabled="disabled"
        @click.prevent="$emit('click')"
    >
        <slot />
    </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({
    components: {},
})
export default class BaseButton extends Vue {

    @Prop({ type: String, default: "first" })
    view!: string

    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    get customClasses() {
        let classes = "button "
        if (this.view) {
            classes += this.view
        }
        return classes
    }

}
</script>

<style lang="scss" scoped>
    .button {
        width: 100%;
        height: 50px;
        border-radius: 16px;
        &.first {
            color: white;
            background-color: #242424;
        }
        &.second {
            color: var(--text--black);
            background-color: var(--main--white);
            border: var(--border-purple-btn);
            box-shadow: var(--shadow-btn-secondary);
        }
        &.mini {
            padding: var(--p-x2) var(--p-x4);
            height: auto;
            width: auto;
            max-height: 34px;
        }
    }
</style>
