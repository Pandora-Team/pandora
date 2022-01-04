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
                <event-card-empty v-if="events.length < 1 && !isAdmin" />
                <event-card-create v-if="isAdmin" />
            </flicking>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import EventCard from "@/components/EventCard.vue"
import EventCardCreate from "@/components/EventCardCreate.vue"
import { EventData, FlickingOptionData } from "@/definitions/interfaces"
import EventCardEmpty from "@/components/EventCardEmpty.vue"

import { Flicking } from "@egjs/vue-flicking"

@Component({
    components: {
        EventCard,
        EventCardCreate,
        Flicking,
        EventCardEmpty,
    },
})
export default class ClassesView extends Vue {

    get flickingOptions(): FlickingOptionData {
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
        @media all and (max-width: 500px) {
            margin-top: 90px;
        }

        h1 {
            color: $color-black;
            margin-bottom: 30px;
        }
        &__body {
            display: flex;
        }
        .event-card {
            margin: 0 40px 40px 0;
            &--empty {
                width: 350px!important;
                height: 485px!important;
                @media all and (max-width: 500px) {
                    width: 300px!important;
                    height: 380px!important;
                }
            }
            @media all and (max-width: 500px) {
                margin: 0 20px 0 0;
                width: 300px;
                height: 380px!important;
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
                width: 260px!important;
            }
        }
    }
    .flicking-viewport {
        padding-bottom: 50px;
        @media all and (max-width: 500px) {
            padding-bottom: 0;
        }
    }
</style>