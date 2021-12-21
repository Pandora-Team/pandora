<template>
    <div class="events">
        <h1>Доступные для записи МК</h1>
        <div class="events__body">
            <flicking
                :options="flickingOptions"
                :viewport-tag="'div'"
                :camera-tag="'div'"
            >
                <event-card
                    v-for="event in events"
                    :key="event._id"
                    :event="event"
                />
                <event-card-create v-if="isAdmin" />
            </flicking>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import EventCard from "@/components/EventCard.vue"
import EventCardCreate from "@/components/EventCardCreate.vue"
import { EventData } from "@/definitions/interfaces"

import { Flicking } from "@egjs/vue-flicking"
import "@egjs/vue-flicking/dist/flicking.css"

@Component({
    components: {
        EventCard,
        EventCardCreate,
        Flicking,
    },
})
export default class ClassesView extends Vue {

    mounted(): void {
        this.$mainStore.events.getListEvents()
    }

    get flickingOptions(): any {
        return {
            align:                "prev",
            noPanelStyleOverride: true,
            disableOnInit:        this.disableFlicking,
            autoInit:             true,
            autoResize:           true,
        }
    }

    get disableFlicking(): boolean {
        //return this.events.length < 3
        return false
    }

    get events(): EventData[] {
        return this.$mainStore.events.listEvents
    }

    get isAdmin(): boolean {
        return this.$mainStore.user.isAdmin
    }

}
</script>

<style lang="scss">
    .events {
        h1 {
            color: $color-black;
            margin-bottom: 30px;
        }
        &__body {
            display: flex;
            flex-wrap: wrap;
        }
        .event-card {
            margin: 0 40px 40px 0;
            @media all and (max-width: 470px) {
                width: 300px;
                &__date {
                    flex-direction: column;
                    align-items: flex-start;
                    p {
                        margin-bottom: 10px;
                        &:nth-last-of-type(1) {
                            margin-bottom: 0;
                        }
                    }
                }
                &__statuses {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    div {
                        margin-bottom: 10px;
                        &:nth-last-of-type(1) {
                            margin-bottom: 0;
                        }
                    }
                }
            }
            @media all and (max-width: 420px) {
                width: 260px;
            }
        }
    }
    .flicking-viewport {
        padding-bottom: 50px;
    }
</style>