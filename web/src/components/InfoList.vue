<template>
    <ul
        v-show="active"
        class="info-list"
        :class="inlineClass"
    >
        <li
            v-for="(item, index) in text"
            :key="index"
            v-html="item"
        />
    </ul>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"

@Component({
    components: {},
})
export default class InfoList extends Vue {

    @Prop({ type: Array })
    readonly text!: string[]

    @Prop({ type: Boolean, default: false })
    readonly active!: boolean

    @Prop({ type: String, default: "" })
    readonly addClass!: string

    get inlineClass(): string {
        return `info-list--${this.addClass}`
    }
}
</script>

<style lang="scss">
    .info-list {
        li {
            padding-left: 20px;
            position: relative;
            font-size: 16px;
            line-height: 20px;
            color: $color-dark;
            margin-bottom: 2px;
            white-space: break-spaces;
            span {
                font-weight: 700;
                color: $color-hover;
            }
            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 5px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: $color-hover;
            }
            &:nth-last-of-type(1) {
                margin-bottom: 0;
            }
        }
        &--mb {
            li {
                margin-bottom: 15px;
            }
        }
    }
</style>