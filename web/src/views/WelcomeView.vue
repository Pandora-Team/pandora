<template>
    <div class="welcome">
        <info-banner />
        <div class="welcome-grid">
            <info-card grid-class="info">
                <div class="info-card__wrapper">
                    <div class="info-card__pic">
                        <img
                            src="@/assets/images/welcome-info.png"
                            alt="info-pic"
                        >
                    </div>
                    <div>
                        <h4>PANDORA - первые k-pop cover dance классы в Туле.</h4>
                        <p>
                            Наша цель - создать творческое k-pop комьюнити<br> для таких классных ребят,
                            как ты. Здесь тебе будет<br> комфортно уже после первого занятия.
                        </p>
                        <ul>
                            <li>Мы ставим топовые k-pop хоряги</li>
                            <li>Учимся как правильно вести себя на камеру</li>
                            <li>Практикуемся в командной работе</li>
                            <li>Весело и с пользой проводим вместе время</li>
                        </ul>
                    </div>
                </div>
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