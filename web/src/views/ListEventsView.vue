<template>
    <div class="events-list">
        <template v-if="events.length">
            <event-row
                v-for="event in events"
                :key="event._id"
                :event="event"
            />
        </template>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import EventRow from "@/components/EventRow.vue"
import { EventData } from "@/definitions/interfaces"

@Component({
    components: {
        EventRow,
    },
})
export default class ListEventsView extends Vue {

    async mounted(): Promise<void> {
        await this.$mainStore.students.getListEvents()
    }

    get events(): EventData[] {
        return this.$mainStore.students.listEvents
    }

}
</script>

<style lang="scss">
    .events-list {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
</style>