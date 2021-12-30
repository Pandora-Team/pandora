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
                text="Вопрос - ответ"
                :path="$mainPaths.RulesView"
            />
            <info-card-mini
                inline-class="classes"
                text="Все классы"
                :path="$mainPaths.ClassesView"
            />
            <event-card
                v-if="visibleNearestEvent"
                :event="nearestEvent"
                grid-class="event"
                :welcome="true"
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
import { EventData } from "@/definitions/interfaces"
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

    get visibleNearestEvent(): boolean {
        return this.$mainStore.events.hasNearestEvent
    }

    get nearestEvent(): EventData {
        return this.$mainStore.events.nearestEvent
    }

    async mounted(): Promise<void> {
        await this.$mainStore.events.getListEvents()
        await this.$mainStore.events.getNearestEventId()
    }
}
</script>

<style lang="scss">
    .welcome {
        &-grid {
            display: grid;
            grid-template-columns: 32.4% 17.1% 17.1% 26%;
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

    @media all and (max-width: 1366px) {
        .welcome {
            &-grid {
                grid-template-columns: 44.8% 12.5% 10.1% 20.9%;
                grid-gap: 20px;
                //grid-auto-rows: minmax(165px, auto);
            }

            .info {
                grid-column: 1/3;
            }
            .event {
                grid-column: 3/6;
                grid-row: 1/2;
            }
            .questions {
                grid-column: 2/4;
            }
            .classes {
                grid-column: 4/6;
            }
        }
    }

    @media all and (max-width: 1000px) {
        .welcome {
            &-grid {
                grid-template-columns: 50.9% 21.1% 21.1%;
            }
            .info {
                grid-column: 1/2;
            }
            .event {
                grid-column: 2/4;
                //grid-row: 1/2;
            }
            .profile {
                grid-column: 1/2;
                padding: 25px;
            }
            .questions {
                grid-column: 2/3;
            }
            .classes {
                grid-column: 3/4;
            }
        }
    }

    @media all and (max-width: 800px) {
        .welcome {
            max-width: 440px;
            margin: -30px auto 0;
            &-grid {
                grid-template-columns: 1fr;
                grid-auto-rows: auto;
                grid-gap: 20px;
            }
            .info {
                grid-row: 2/3;
                grid-column: 1/2;
                box-shadow: $shadow-block;
            }
            .event {
                grid-row: 1/2;
                grid-column: 1/2;
                height: 360px;
                box-shadow: $shadow-block;
            }
            .profile {
                grid-row: 3/4;
                grid-column: 1/2;
                box-shadow: $shadow-block;
            }
            .questions {
                grid-row: 4/5;
                grid-column: 1/2;
                box-shadow: $shadow-block;
            }
            .classes {
                grid-row: 5/6;
                grid-column: 1/2;
                box-shadow: $shadow-block;
            }
        }
    }
</style>