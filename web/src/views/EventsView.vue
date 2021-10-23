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

import { Component, Vue, Watch } from "vue-property-decorator"
import EventCard from "@/components/EventCard.vue"
import EventCardCreate from "@/components/EventCardCreate.vue"
import EventPopup from "@/components/EventPopup.vue"
import { EventData } from "@/constants/interfaces"

@Component({
    components: {
        EventCard,
        EventCardCreate,
        EventPopup,
    },
})
export default class EventsView extends Vue {

    events: EventData[] = []

    @Watch("$mainStore.events.listEvents", { deep: true, immediate: true })
    updateEvents(): void {
        this.events = this.$mainStore.events.listEvents
    }

    mounted(): void {
        this.$mainStore.events.getListEvents()
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