<template>
    <div
        :class="`info-card-mini ${inlineClass}`"
        @click="onClick"
    >
        <img
            :src="srcPathImg"
            alt="Image"
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

    get srcPathImg(): string {
        if (this.inlineClass === "classes") {
            if (this.isMobile) return require("@/assets/bg/welcome-classes-min.png")
            return require("@/assets/bg/welcome-classes.png")
        }
        if (this.inlineClass === "questions") {
            if (this.isMobile) return require("@/assets/bg/welcome-questions-min.png")
            return require("@/assets/bg/welcome-questions.png")
        }
        return ""
    }

    get isMobile(): boolean {
        return this.$mainStore.app.isMobile
    }

    onClick(): void {
        if (this.path) {
            this.$router.push({ path: this.path })
        }
    }

}
</script>

<style lang="scss">
    .info-card-mini {
        height: 155px;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 199px;
            background: $gradient-mini-info-card;
            z-index: 3;
        }
        @media all and (max-width: 800px) {
            &::before {
                position: initial;
            }
        }
        img {
            object-fit: cover;
            transition: 1s;
            opacity: .6;
            @media all and (max-width: 800px) {
                opacity: 1;
            }
        }
        @media all and (min-width: 800px) {
            &:hover {
                img {
                    opacity: 1;
                }
            }
        }
        h3 {
            position: absolute;
            bottom: 0;
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