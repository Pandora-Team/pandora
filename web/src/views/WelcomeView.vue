<template>
    <div class="welcome">
        <welcome-banner />
        <div class="welcome-grid">
            <info-card grid-class="info">
                <welcome-info />
            </info-card>
            <!--<event-card
                :event="data"
            />-->
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import WelcomeBanner from "@/components/WelcomeBanner.vue"
import InfoCard from "@/components/InfoCard.vue"
import EventCard from "@/components/EventCard.vue"
import WelcomeInfo from "@/components/WelcomeInfo.vue"

@Component({
    components: {
        WelcomeBanner,
        InfoCard,
        EventCard,
        WelcomeInfo,
    },
})
export default class WelcomeView extends Vue {

}
</script>

<style lang="scss">
    .welcome {
        &-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 30px;
            grid-auto-rows: minmax(258px, auto);
            .info {
                grid-column: 1 / 4;
                grid-row: 1;
            }
        }
    }
</style>