<template>
    <div class="welcome">
        <welcome-banner />
        <div class="welcome-grid">
            <info-card grid-class="info">
                <welcome-info />
            </info-card>
            <info-card grid-class="profile">
                <welcome-profile />
            </info-card>
            <info-card-mini
                grid-class="questions"
                bg="questions"
                text="Вопрос - ответ"
            />
            <info-card-mini
                grid-class="classes"
                bg="classes"
                text="Все классы"
            />
            <!--<event-card />-->
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

@Component({
    components: {
        WelcomeBanner,
        InfoCard,
        EventCard,
        WelcomeInfo,
        WelcomeProfile,
        InfoCardMini,
    },
})
export default class WelcomeView extends Vue {

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
        }
    }
</style>