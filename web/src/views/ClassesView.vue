<template>
    <div class="events">
        <h1>Доступные для записи МК</h1>
        <div class="events__body">
            <events-list />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import EventCard from "@/components/EventCard.vue"
import EventCardCreate from "@/components/EventCardCreate.vue"
import EventCardEmpty from "@/components/EventCardEmpty.vue"
import EventsList from "@/components/EventsList.vue"

@Component({
    components: {
        EventCard,
        EventCardCreate,
        EventCardEmpty,
        EventsList,
    },
})
export default class ClassesView extends Vue {}
</script>

<style lang="scss">
    .events {
        @media all and (max-width: 800px) {
            margin-top: 90px;
        }

        h1 {
            color: $color-black;
            margin-bottom: 30px;
        }
        .event-card {
            &--empty {
                width: 350px!important;
                height: 485px!important;
                @media all and (max-width: 500px) {
                    width: 100% !important;
                }
            }
            @media all and (max-width: 500px) {
                &__date {
                    flex-direction: column;
                    align-items: flex-start;
                    p {
                        margin-bottom: 15px;
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

        }
    }
</style>