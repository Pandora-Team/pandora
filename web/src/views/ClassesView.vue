<template>
    <div class="events">
        <h1>Доступные для записи МК</h1>
        <event-popup v-if="$mainStore.events.activePopup" />
        <div class="events__body">
            <template v-if="!!events.length">
                <event-card
                    v-for="event in events"
                    :key="event._id"
                    :event="event"
                />
            </template>
            <event-card-create v-if="isAdmin" />
        </div>
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
export default class ClassesView extends Vue {

    events: EventData[] = []

    @Watch("$mainStore.events.listEvents", { deep: true, immediate: true })
    updateEvents(): void {
        this.events = this.$mainStore.events.listEvents
    }

    mounted(): void {
        this.$mainStore.events.getListEvents()
    }

    get isAdmin(): boolean {
        return this.$mainStore.user.role === "admin"
    }

}
</script>

<style lang="scss">
    .events {
        h1 {
            color: $color-hover;
            margin-bottom: 30px;
            text-align: center;
        }
        &__body {
            display: flex;
            flex-wrap: wrap;
        }
        .event-card {
            margin: 0 40px 40px 0;
        }
    }
</style>