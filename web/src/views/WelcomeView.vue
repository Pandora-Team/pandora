<template>
    <div class="welcome">
        <info-banner />
        <div class="welcome-wrapper">
            <info-card>
                <template>
                    <p>PANDORA - первые k-pop cover dance классы в Туле.</p>
                    <p>
                        Наша цель - создать творческое k-pop комьюнити для таких<br> классных ребят,
                        как ты. Здесь тебе будет комфортно уже после<br> первого занятия.
                    </p>
                    <ul>
                        <li>Мы ставим топовые k-pop хоряги</li>
                        <li>Учимся как правильно вести себя на камеру</li>
                        <li>Практикуемся в командной работе</li>
                        <li>Весело и с пользой проводим вместе время</li>
                    </ul>
                </template>
            </info-card>
            <!--<event-card
                :event="data"
            />-->
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import InfoBanner from "@/components/InfoBanner.vue"
import InfoCard from "@/components/InfoCard.vue"
import EventCard from "@/components/EventCard.vue"

@Component({
    components: {
        InfoBanner,
        InfoCard,
        EventCard,
    },
})
export default class WelcomeView extends Vue {

}
</script>

<style lang="scss">
    .welcome {
        &-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
    }
</style>