<template>
    <div class="events">
        <event-card-create />
        <event-popup v-if="$mainStore.events.activePopup" />
        <template v-if="!!events.length">
            <event-card
                v-for="event in events"
                :key="event._id"
                :event="event"
            />
        </template>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import EventCard from "@/components/EventCard.vue"
import EventCardCreate from "@/components/EventCardCreate.vue"
import EventPopup from "@/components/EventPopup.vue"
import { getAllEvent } from "@/api/events"
import { EventData } from "@/constants/interfaces"

@Component({
    components: {
        EventCard,
        EventCardCreate,
        EventPopup,
    },
})
export default class EventsView extends Vue {

    async mounted() {
        const { data } = await getAllEvent()
        this.events = data
    }

    events: EventData[] = []

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