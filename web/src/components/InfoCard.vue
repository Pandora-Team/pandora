<template>
    <div
        :class="`info-card ${inlineClass}`"
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
    inlineClass!: string

}
</script>

<style lang="scss">
    .info-card {
        background: $bg-info;
        border-radius: 30px;
        padding: 24px 40px;
        &__wrapper {
            display: flex;
            &--about {
                .info-card__pic {
                    max-width: 408px;
                    max-height: 210px;
                    margin-right: 42px;
                }
                h4 {
                    color: $color-hover;
                    margin-bottom: 15px;
                }
                p {
                    color: $color-dark;
                    margin-bottom: 16px;
                }
            }
            &--profile {
                justify-content: space-between;
                .info-card__pic {
                    max-width: 117px;
                    max-height: 117px;
                }
                h3 {
                    color: $color-hover;
                    margin-bottom: 25px;
                }
                h4 {
                    color: $color-dark;
                    margin-bottom: 10px;
                }
                p {
                    color: $color-gray;
                    span {
                        display: inline-block;
                        margin-left: 16px;
                        color: $color-black;
                    }
                }
            }
        }
        &__pic {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 100%;
            }
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
        &.profile {
            padding: 30px 40px;
        }
    }
</style>