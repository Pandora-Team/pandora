<template>
    <div class="info-card__wrapper info-card__wrapper--about">
        <div class="info-card__pic">
            <img
                src="@/assets/images/welcome-info.png"
                alt="info-pic"
            >
        </div>
        <div class="info-card__content">
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
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({
    components: {},
})
export default class WelcomeInfo extends Vue {

}
</script>

<style lang="scss">

</style>