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
                        //margin-left: 16px;
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
            padding: 30px 50px 30px 40px;
        }
    }

    @media all and (max-width: 1366px) {
        .info-card {
            padding: 23px 19px;

            &__content {
                h3 {
                    font-size: 22px;
                    line-height: 27px;
                }
            }

            &__wrapper {
                &--about {
                    flex-direction: column;

                    .info-card__pic {
                        max-width: none;
                        max-height: none;
                        width: 100%;
                        margin-right: 0;
                        margin-bottom: 30px;
                    }

                    p {
                        font-size: 14px;
                        line-height: 18px;
                    }

                    ul {
                        display: none;
                    }
                }

                &--prfole {
                    h3 {
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }

    @media all and (max-width: 1000px) {
        .info-card {
            &__wrapper {
                &--profile {
                    align-items: flex-end;

                    .info-card__content {
                        margin-right: 10px;
                    }

                    .info-card__pic {
                        max-width: 101px;
                        max-height: 101px;
                    }

                    .birthday {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
</style>