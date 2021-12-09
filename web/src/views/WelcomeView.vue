<template>
    <div class="welcome">
        <welcome-banner />
        <div class="welcome-grid">
            <info-card inline-class="info">
                <welcome-info :path="$mainPaths.AboutView" />
            </info-card>
            <info-card inline-class="profile">
                <welcome-profile :path="$mainPaths.ProfileView" />
            </info-card>
            <info-card-mini
                inline-class="questions"
                bg="questions"
                text="Вопрос - ответ"
                :path="$mainPaths.RulesView"
            />
            <info-card-mini
                inline-class="classes"
                bg="classes"
                text="Все классы"
                :path="$mainPaths.ClassesView"
            />
            <event-card
                v-if="visibleNearestEvent"
                :event="event"
                grid-class="event"
                :welcome="true"
                @remove="updateNearestEvent"
            />
            <event-card-empty
                v-else
                grid-class="event"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import WelcomeBanner from "@/components/WelcomeBanner.vue"
import InfoCard from "@/components/InfoCard.vue"
import EventCard from "@/components/EventCard.vue"
import WelcomeInfo from "@/components/WelcomeInfo.vue"
import WelcomeProfile from "@/components/WelcomeProfile.vue"
import InfoCardMini from "@/components/InfoCardMini.vue"
import { getNearestEvent } from "@/api/events"
import { EventData } from "@/definitions/interfaces"
import { isEmpty } from "lodash"
import EventCardEmpty from "@/components/EventCardEmpty.vue"

@Component({
    components: {
        WelcomeBanner,
        InfoCard,
        EventCard,
        WelcomeInfo,
        WelcomeProfile,
        InfoCardMini,
        EventCardEmpty,
    },
})
export default class WelcomeView extends Vue {

    event!: EventData

    visibleNearestEvent = false

    async mounted(): Promise<void> {
        await this.getNearestEvent()
    }

    async getNearestEvent(): Promise<void> {
        try {
            const res = await getNearestEvent()
            if (!isEmpty(res.data)) {
                this.event = res.data
                this.visibleNearestEvent = true
            }
        } catch (e) {
            throw new Error(`Error Get Nearest Event - ${e}`)
        }
    }

    async updateNearestEvent(): Promise<void> {
        this.visibleNearestEvent = false
    }
}
</script>

<style lang="scss">
    .welcome {
        &-grid {
            display: grid;
            grid-template-columns: 486px 257px 257px 410px;
            grid-gap: 30px;
            grid-auto-rows: minmax(165px, auto);
            .info {
                grid-column: 1 / 4;
                grid-row: 1;
            }
            .profile {
                padding: 24px 30px 24px 40px;
                grid-column: 1 / 2;
                grid-row: 2;
            }
            .questions {
                grid-column: 2 / 3;
                grid-row: 2;
            }
            .classes {
                grid-column: 3 / 4;
                grid-row: 2;
            }
            .event {
                grid-column: 4 / 5;
                grid-row: 1 / 3;
            }
        }
    }
</style>