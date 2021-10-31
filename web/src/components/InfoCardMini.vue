<template>
    <div :class="`info-card-mini ${gridClass}`">
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
    gridClass!: string

    @Prop({ type: String, default: "" })
    bg!: string

    @Prop({ type: String, default: "" })
    text!: string

    get inlinePath(): string {
        return require(`@/assets/bg/welcome-${this.bg}.png`)
    }

}
</script>

<style lang="scss">
    .info-card-mini {
        width: 257px;
        height: 165px;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        img {
            transition: .5s;
            position: absolute;
            opacity: 0.85;
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
</style>