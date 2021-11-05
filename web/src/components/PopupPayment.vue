<template>
    <main-popup @close="closePopup">
        <div
            class="event-card event-card--payment"
        >
            <div class="event-card__wrapper">
                <div class="event-card__content">
                    <h2>До встречи на трене!</h2>
                    <p>
                        Спасибо за записать на МК.
                        Возьми с собой удобную одежду и обувь для тренировки, а также бутылку воды.
                    </p>
                    <p v-if="visibleCashText">
                        Ты выбрал способ оплаты <b>«Наличными»</b>.
                        Оплата проходит в начале занятия наставнику. (желательно без сдачи)
                    </p>
                    <p v-else>
                        Ты выбрал способ оплаты <b>«Переводом на карту»</b>.
                        До субботы необходимо оплатить МК по номеру телефону: <b>+7 919 073-21-98 (Анастасия Е.)</b>,
                        Сбер. и подписать свои ФИ в комментариях.
                    </p>
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
import { typesStatus } from "@/constants/typeStatus"

@Component({
    components: {
        MainPopup,
        EventCard,
        MainBtn,
    },
})
export default class PopupPayment extends Vue {

    typesStatus = typesStatus

    get typePayment(): string {
        return this.$mainStore.popup.typePayment
    }

    get visibleCashText(): boolean {
        return this.typesStatus.cash.name === this.typePayment
    }

    closePopup(): void {
        this.$mainStore.popup.changeActivePaymentPopup(false)
    }
}
</script>

<style lang="scss">
    .event-card {
        &--payment {
            color: $color-black;
            background: url("../assets/bg/popup-payment.jpg") top no-repeat;
            background-size: contain;
            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                background: $gradient-white;
                width: 410px;
                height: 545px;
                border-radius: 30px;
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
                margin-bottom: 30px;
            }
            .event-card__action {
                margin-bottom: 0;
            }
        }

    }
</style>
