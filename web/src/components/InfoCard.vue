<template>
    <div
        :class="`info-card ${gridClass}`"
    >
        <slot />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"

@Component({
    components: {},
})
export default class InfoCard extends Vue {

    @Prop({ type: String, default: "" })
    gridClass!: string

}
</script>

<style lang="scss">
    .info-card {
        background: $bg-info;
        border-radius: 30px;
        padding: 24px 40px;
        &__wrapper {
            display: flex;
        }
        &__pic {
            max-width: 408px;
            max-height: 210px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 42px;
            img {
                width: 100%;
            }
        }
        h4 {
          color: $color-hover;
          margin-bottom: 15px;
        }
        p {
            color: $color-dark;
            margin-bottom: 16px;
        }
        ul {
            li {
                padding-left: 20px;
                position: relative;
                font-size: 16px;
                line-height: 20px;
                color: $color-dark;
                margin-bottom: 2px;
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
        }
    }
</style>