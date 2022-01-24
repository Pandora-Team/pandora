<template>
    <div
        :class="`info-card-mini ${inlineClass}`"
        @click="onClick"
    >
        <h3>{{ text }}</h3>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"

@Component({
    components: {},
})
export default class InfoCard extends Vue {

    @Prop({ type: String, default: "" })
    readonly inlineClass!: string

    @Prop({ type: String, default: "" })
    readonly text!: string

    @Prop({ type: String, default: "" })
    readonly path!: string

    onClick(): void {
        if (this.path) {
            this.$router.push({ path: this.path })
        }
    }

}
</script>

<style lang="scss">
    .info-card-mini {
        //width: 257px;
        height: 155px;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        padding: 10px 10px 0 10px;
        &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 199px;
            background: $gradient-info-card;
            z-index: 3;
        }
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 165px;
            transition: 1s;
            opacity: 60%;
            @media all and (max-width: 500px) {
                opacity: 100%;
            }
        }
        @media all and (min-width: 500px) {
            &:hover {
                &::after {
                    opacity: 100%;
                }
            }
        }
        &.questions {
            &::after {
                background: url("../assets/bg/welcome-questions.png") top/cover no-repeat;
            }
        }
        &.classes {
            &::after {
                background: url("../assets/bg/welcome-classes.png") top/cover no-repeat;
            }
        }
        h3 {
            position: relative;
            z-index: 3;
            color: $color-white;
            letter-spacing: 0.01em;
            margin-bottom: 30px;
            text-align: center;
        }
    }

    @media all and (max-width: 1366px) {
        .info-card-mini {
            h3 {
                margin-bottom: 23px;
                font-size: 22px;
                line-height: 27px;
                text-align: center;
            }
        }
    }

    @media all and (max-width: 800px) {
        .info-card-mini {
            height: 104px;
        }
    }

</style>