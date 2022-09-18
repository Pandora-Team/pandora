<template>
    <main-popup @close="closePopup">
        <div
            class="event-card event-card--welcome_popup"
        >
            <div class="event-card__wrapper">
                <div class="event-card__content">
                    <h2>Подробнее о project classes</h2>
                    <p>
                        {{ "Проектный класс длится 4 занятия. За это время мы разбираем хорео и делаем постановку (рисунки, костюмы, съёмка)." }}
                    </p>
                    <p>{{ "Стоимость полного пр.класса — 2 000 ₽. Можно оплатить частично: 1 000 ₽ предоплата на первом занятии + 250 ₽ каждое занятие." }}</p>
                    <p>{{ "Предоплата не возвращается. Также, скидки не распространяются на пр. классы." }}</p>
                    <div class="event-card__action">
                        <main-btn
                            :full-width="true"
                            @click="closePopup"
                        >
                            Ок, всё понял(а)
                        </main-btn>
                    </div>
                </div>
            </div>
        </div>
    </main-popup>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import MainPopup from "@/components/MainPopup.vue"
import EventCard from "@/components/EventCard.vue"
import MainBtn from "@/components/MainBtn.vue"

@Component({
    components: {
        MainPopup,
        EventCard,
        MainBtn,
    },
})
export default class PopupProjectInfo extends Vue {

    closePopup(): void {
        this.$mainStore.popup.changeActiveProjectInfoPopup(false)
    }
}
</script>

<style lang="scss" scoped>
    .event-card {
        &--welcome_popup {
            color: $color-black;
            background: url("../assets/bg/popup-project-info.jpg") top no-repeat;
            background-size: cover;
            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                background: $gradient-white;
                width: 410px;
                height: 545px;
                border-radius: 30px;
                @media all and (max-width: 500px) {
                    width: 100%;
                }
            }
            &:hover {
                box-shadow: none!important;
            }
            h2 {
                margin-bottom: 30px;
            }
            p {
                font-size: 16px;
                font-weight: 400;
                margin-bottom: 15px;
                &:nth-last-of-type(1) {
                    margin-bottom: 30px;
                }
            }
            .event-card__action {
                margin-bottom: 0;
            }
            @media all and (max-width: 500px) {
                width: calc(100% - 60px);
            }
        }

    }
</style>
