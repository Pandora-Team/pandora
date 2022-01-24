<template>
    <carousel
        :per-page-custom="[[320, 1],[1150, 2], [1700, 3]]"
        pagination-active-color="#5E2AC3"
        pagination-color="#efefef"
        :pagination-padding="10"
        :pagination-size="10"
    >
        <slide
            v-for="event in events"
            :key="event._id"
        >
            <event-card :event="event" />
        </slide>
        <slide v-if="events.length < 1 && !isAdmin">
            <event-card-empty />
        </slide>
        <slide v-if="isAdmin">
            <event-card-create />
        </slide>
    </carousel>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Carousel, Slide } from "vue-carousel"
import EventCard from "@/components/EventCard.vue"
import EventCardCreate from "@/components/EventCardCreate.vue"
import EventCardEmpty from "@/components/EventCardEmpty.vue"
import { EventData } from "@/definitions/interfaces"

@Component({
    components: {
        Carousel,
        Slide,
        EventCard,
        EventCardCreate,
        EventCardEmpty,
    },
})
export default class EventsCarouselComponent extends Vue {

    get events(): EventData[] {
        return this.$mainStore.events.listEvents
    }

    get isAdmin(): boolean {
        return this.$mainStore.user.isAdmin
    }

}
</script>

<style lang="scss">
    .VueCarousel {
        &-slide {
            @media all and (max-width: 1150px) {
                display: flex;
                justify-content: center;
            }
        }
    }
</style>