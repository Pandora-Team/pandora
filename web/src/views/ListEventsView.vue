<template>
    <div class="events-list">
        <template v-if="futureEvents.length">
            <event-row
                v-for="event in futureEvents"
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
        <template v-if="pastEvents.length && visiblePastEvents">
            <event-row
                v-for="event in pastEvents"
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
                return DateTime.fromISO(event.date).plus({ hour: 1 }) >= DateTime.now()
            }
            return DateTime.fromJSDate(event.date).plus({ hour: 1 }) >= DateTime.now()
        })
    }

    get pastEvents(): EventData[] {
        return this.events.filter(event => {
            if (typeof event.date === "string") {
                return DateTime.fromISO(event.date).plus({ hour: 1 }) < DateTime.now()
            }
            return DateTime.fromJSDate(event.date).plus({ hour: 1 }) < DateTime.now()
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
            text-align: center;
            cursor: pointer;
            margin: 0 auto 30px;
            border-radius: 30px;
            padding: 30px 40px;
            font-size: 18px;
            font-weight: 600;
            color: $color-purple;
            position: relative;
            width: 350px;
            line-height: 22px;
            @media all and (max-width: 500px) {
                width: calc(100% - 80px);
            }
            &::after {
                transition: .5s;
                content: "";
                position: absolute;
                top: calc(50% - 3px);
                right: 20px;
                border-style: solid;
                border-width: 5.4px 5px 0 5px;
                border-color: $color-purple transparent transparent transparent;
                @media all and (max-width: 500px) {
                    top: auto;
                    bottom: 10px;
                    right: calc(50% - 5px);
                }
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