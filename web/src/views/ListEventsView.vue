<template>
    <div class="events-list">
        <template v-if="futureEvents.length">
            <event-row
                v-for="event in futureEvents"
                :key="event._id"
                :event="event"
            />
        </template>
        <template v-if="pastEvents.length && visiblePastEvents">
            <event-row
                v-for="event in pastEvents"
                :key="event._id"
                :event="event"
            />
        </template>
        <div
            class="events-list__btn"
            :class="{'events-list__btn--active': visiblePastEvents}"
            @click="showPastEvents"
        >
            {{ textShowPastEvents }}
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import EventRow from "@/components/EventRow.vue"
import { EventData } from "@/definitions/interfaces"
import { DateTime } from "luxon"

@Component({
    components: {
        EventRow,
    },
})
export default class ListEventsView extends Vue {

    async mounted(): Promise<void> {
        await this.$mainStore.students.getListEvents()
    }

    visiblePastEvents = false

    get events(): EventData[] {
        return this.$mainStore.students.listEvents
    }

    get futureEvents(): EventData[] {
        return this.events.filter(event => {
            if (typeof event.date === "string") {
                return DateTime.fromISO(event.date) >= DateTime.now().plus({ hour: 1 })
            }
            return DateTime.fromJSDate(event.date) >= DateTime.now().plus({ hour: 1 })
        })
    }

    get pastEvents(): EventData[] {
        return this.events.filter(event => {
            if (typeof event.date === "string") {
                return DateTime.fromISO(event.date) < DateTime.now().plus({ hour: 1 })
            }
            return DateTime.fromJSDate(event.date) < DateTime.now().plus({ hour: 1 })
        })
    }

    get textShowPastEvents(): string {
        if (this.visiblePastEvents) return "Скрыть прошедшие мероприятия"
        return "Показать прошедшие мероприятия"
    }

    showPastEvents(): void {
        this.visiblePastEvents = !this.visiblePastEvents
    }

}
</script>

<style lang="scss">
    .events-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        &__btn {
            cursor: pointer;
            margin-bottom: 30px;
            border-radius: 30px;
            background: #F6F6FC;
            padding: 30px 40px;
            font-size: 18px;
            font-weight: 600;
            color: $color-gray;
            position: relative;
            width: 350px;
            &::after {
                transition: .5s;
                content: "";
                position: absolute;
                top: calc(50% - 3px);
                right: 20px;
                border-style: solid;
                border-width: 5.4px 5px 0 5px;
                border-color: $color-gray transparent transparent transparent;
            }
            &--active {
                &::after {
                    transform: rotate(180deg);
                    transform-origin: center;
                }
            }
        }
    }
</style>