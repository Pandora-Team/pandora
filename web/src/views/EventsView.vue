<template>
    <div class="events">
        <event-card-create/>
        <event-card
            :event="data"
        />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import EventCard from "@/components/EventCard.vue"
import EventCardCreate from "@/components/EventCardCreate.vue"

@Component({
    components: {
        EventCard,
        EventCardCreate,
    },
})
export default class EventsView extends Vue {
    data = {
        background: "events-bg.png",
        title:      "Taemin - Advice",
        date:       "05.09.21",
    }
}
</script>

<style lang="scss">
    .events {
        display: flex;
        flex-wrap: wrap;
        .event-card {
            margin: 0 40px 40px 0;
        }
    }
</style>