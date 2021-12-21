<template>
    <div class="player-youtube">
        <youtube
            :width="width"
            :height="height"
            :video-id="videoId"
        />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getIdFromUrl } from "vue-youtube"

@Component({
    components: {},
})
export default class PlayerYoutube extends Vue {

    @Prop({ type: String, default: "" })
    readonly url!: string

    @Prop({ type: String, default: "" })
    readonly width!: string

    @Prop({ type: String, default: "" })
    readonly height!: string

    get videoId (): string {
        return getIdFromUrl(this.url)
    }
}
</script>

<style lang="scss">
    .player-youtube {
        width: 100%;
        &:nth-last-of-type(1) {
            margin-left: 30px;
            @media all and (max-width: 800px) {
                margin-left: 0;
            }
        }
        iframe {
            width: 100%;
            max-width: 735px;
        }
    }
</style>