<template>
    <div
        class="info-card__wrapper info-card__wrapper--about"
        @click="onClick"
    >
        <div class="info-card__pic">
            <img
                src="@/assets/images/welcome-info.png"
                alt="info-pic"
            >
        </div>
        <div class="info-card__content">
            <h4>PANDORA - первые k-pop cover dance классы в Туле.</h4>
            <p>
                Наша цель - создать творческое k-pop комьюнити для таких классных ребят,
                как ты. Здесь тебе будет комфортно уже после первого занятия.
            </p>
            <info-list
                :active="true"
                :text="listText"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import InfoList from "@/components/InfoList.vue"

@Component({
    components: {
        InfoList,
    },
})
export default class WelcomeInfo extends Vue {

    @Prop({ type: String, default: "" })
    readonly path!: string

    listText = [
        "Мы ставим топовые k-pop хоряги",
        "Учимся как правильно вести себя на камеру",
        "Практикуемся в командной работе",
        "Весело и с пользой проводим вместе время",
    ]

    onClick(): void {
        if (this.path) {
            this.$router.push({ path: this.path })
        }
    }
}
</script>

<style lang="scss">
    .info-card__wrapper--about {
        cursor: pointer;
    }
</style>