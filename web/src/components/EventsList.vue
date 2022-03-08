<template>
    <div class="event-list">
        <event-card
            v-for="event in events"
            :key="event._id"
            :event="event"
        />
        <event-card-empty v-if="events.length < 1 && !isAdmin" />
        <event-card-create v-if="isAdmin" />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import EventCard from "@/components/EventCard.vue"
import EventCardCreate from "@/components/EventCardCreate.vue"
import EventCardEmpty from "@/components/EventCardEmpty.vue"
import { EventData } from "@/definitions/interfaces"

@Component({
    components: {
        EventCard,
        EventCardCreate,
        EventCardEmpty,
    },
})
export default class EventsList extends Vue {

    get events(): EventData[] {
        return this.$mainStore.events.listEvents
    }

    get isAdmin(): boolean {
        return this.$mainStore.user.isAdmin
    }

}
</script>

<style lang="scss">
    .event-list {
        display: flex;
        flex-wrap: wrap;
        .event-card {
            margin: 0 20px 20px 0;
            @media  all and (max-width: 500px) {
                margin: 0 0 20px 0;
            }
        }
    }
</style>