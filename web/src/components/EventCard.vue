<template>
    <div
        class="event-card"
        :style="{'background-image': background}"
    >
        <main-status/>

    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import MainStatus from "@/components/MainStatus.vue"

@Component({
    components: {
        MainStatus,
    },
})
export default class EventCard extends Vue {
    @Prop({ type: String, default: "" })
    background!: string
}
</script>

<style lang="scss">
   .event-card {
       width: 410px;
   }
</style>