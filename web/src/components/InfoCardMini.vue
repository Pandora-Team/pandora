<template>
    <div
        :class="`info-card-mini ${inlineClass}`"
        @click="onClick"
    >
        <img
            :src="inlinePath"
            alt="background"
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
    readonly bg!: string

    @Prop({ type: String, default: "" })
    readonly text!: string

    @Prop({ type: String, default: "" })
    readonly path!: string

    get inlinePath(): string {
        return require(`@/assets/bg/welcome-${this.bg}.png`)
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
        //width: 257px;
        height: 165px;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        padding: 10px 10px 0 10px;
        img {
            transition: .5s;
            position: absolute;
            opacity: 0.85;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        h3 {
            position: relative;
            z-index: 3;
            color: $color-white;
            letter-spacing: 0.01em;
            margin-bottom: 30px;
        }
        &:hover {
            img {
                opacity: 1;
            }
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