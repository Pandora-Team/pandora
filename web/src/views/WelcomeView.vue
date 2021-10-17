<template>
    <div class="welcome">
        <banner />
        <card-info> 
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
        </card-info>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import Banner from "@/components/Banner.vue"
import CardInfo from "@/components/CardInfo.vue"
import CardEvent from "@/components/CardEvent.vue"

@Component({
    components: {
        Banner,
        CardInfo,
        CardEvent,
    },
})
export default class WelcomeView extends Vue {

}
</script>

<style lang="scss">

</style>