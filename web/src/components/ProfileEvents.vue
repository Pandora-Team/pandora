<template>
    <div class="profile-events">
        <h3>Посещённые классы</h3>
        <div
            v-if="events.length"
            class="profile-events__list"
        >
            <div
                v-for="item in events"
                :key="item._id"
                class="profile-events__item"
            >
                <h4>{{ item.name }}</h4>
                <h4>Дата: <span>{{ item.date }}</span></h4>
            </div>
        </div>
        <div v-else>
            <div class="profile-events__item">
                <h4>Нет посещённых мероприятий</h4>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"
import LkSocialItem from "@/components/LkSocialItem.vue"
import { getVisitedEvents } from "@/api/events"
import { UserVisitedEventsData } from "@/definitions/interfaces"
import dayjs from "dayjs"

@Component({
    components: {
        LkAvatar,
        LkSocialItem,
    },
})
export default class ProfileEvents extends Vue {

    events: UserVisitedEventsData[] = []

    async mounted(): Promise<void> {
        const { data } = await getVisitedEvents()
        if (data.length) {
            this.events = data.map((event: { date: Date | string }) => {
                event.date = dayjs(event.date).format("DD.MM.YYYY")
                return event
            })
        }
    }
}
</script>

<style lang="scss">
    .profile {
        &-events {
            background: $bg-info;
            border-radius: 30px;
            padding: 30px 40px;
            color: $color-black;
            h3 {
                margin-bottom: 40px;
                color: $color-dark;
            }
            &__list {
                max-height: 162px;
                overflow-y: auto;
                @media all and (max-width: 1500px) {
                    max-height: 170px;
                }
            }
            &__item {
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                color: inherit;
                margin-right: 20px;
                h4 {
                    &:first-of-type {
                        margin-right: 10px;
                    }
                }
                &:nth-last-of-type(1) {
                    margin-bottom: 0;
                }
                span {
                    font-size: $font-size-big-text;
                }
            }
        }
    }
</style>