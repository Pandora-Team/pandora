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
                <h4 class="profile-events__item-name">
                    {{ item.name }}
                </h4>
                <p>Дата: <span>{{ item.date }}</span></p>
            </div>
        </div>
        <div v-else>
            <div class="profile-events__item">
                <p>Нет посещённых мероприятий</p>
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
            @media all and (max-width: 500px) {
                padding: 30px;
            }
            h3 {
                margin-bottom: 40px;
                color: $color-dark;
                @media all and (max-width: 500px) {
                    margin-bottom: 20px;
                }
            }
            &__list {
                max-height: 162px;
                overflow-y: auto;
                @media all and (max-width: 1500px) {
                    max-height: 170px;
                }
                @media all and (max-width: 500px) {
                    max-height: 220px;
                }
            }
            &__item {
                margin-bottom: 15px;
                display: flex;
                justify-content: space-between;
                color: inherit;
                margin-right: 20px;
                &-name {
                    margin-right: 10px;
                    @media all and (max-width: 500px) {
                        font-size: 16px;
                    }
                }
                p {
                    color: #979299;
                    margin-bottom: 0;
                    span {
                        font-size: 16px;
                        color: $color-black;
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