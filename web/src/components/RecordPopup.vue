<template>
    <main-popup @close="closePopup">
        <event-card
            :event="event"
            :record="true"
        />
    </main-popup>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { EventData } from "@/constants/interfaces"
import MainPopup from "@/components/MainPopup.vue"
import EventCard from "@/components/EventCard.vue"

@Component({
    components: {
        MainPopup,
        EventCard,
    },
})
export default class RecordPopup extends Vue {

    get event(): EventData {
        return this.$mainStore.events.recordedState
    }

    closePopup(): void {
        this.$mainStore.events.closeEventPopup()
    }
}
</script>
