<template>
    <main-popup @close="closePopup">
        <div
            class="event-card event-card--record"
            :style="inlineStyle"
        >
            <div class="event-card__wrapper">
                <div class="event-card__content">
                    <h2>{{ event.name }}</h2>
                    <div
                        class="event-card__date"
                    >
                        <p>Дата:&nbsp;<span>{{ date }}</span></p>
                        <p>Время:&nbsp;<span>{{ time }}</span></p>
                    </div>

                    <p>
                        Адрес: <span>{{ event.address }}</span>
                    </p>
                    <p>
                        Стоимость: <span>{{ event.price }} р.</span>
                    </p>
                    <div
                        class="event-card__payment"
                        :class="{'event-card__payment--mb': $v.$error}"
                    >
                        <p>Оплата:</p>
                        <main-radio
                            id="cash"
                            name="payment"
                            text="Наличными"
                            :value="payment"
                            @change-value="changePayment"
                        />
                        <main-radio
                            id="card"
                            name="payment"
                            text="Переводом на карту"
                            :value="payment"
                            @change-value="changePayment"
                        />
                        <transition
                            name="error"
                            mode="out-in"
                        >
                            <div
                                v-if="errorPayment"
                                class="event-card__error"
                            >
                                {{ errorPayment }}
                            </div>
                        </transition>
                    </div>
                    <main-btn
                        :full-width="true"
                        @click="onClick"
                    >
                        Записаться
                    </main-btn>
                </div>
            </div>
        </div>
    </main-popup>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { EventData } from "@/definitions/interfaces"
import MainPopup from "@/components/MainPopup.vue"
import MainBtn from "@/components/MainBtn.vue"
import MainRadio from "@/components/MainRadio.vue"
import { statusData, typesStatus } from "@/definitions/typeStatus"
import dayjs from "dayjs"
import { required } from "vuelidate/lib/validators"
import { recordOnEvent } from "@/api/events"

@Component({
    components: {
        MainPopup,
        MainBtn,
        MainRadio,
    },
    validations: {
        payment: required,
    },
})
export default class PopupRecord extends Vue {

    payment = ""

    typesStatuses = typesStatus

    get event(): EventData {
        return this.$mainStore.popup.recordedState
    }

    get inlineStyle(): { backgroundImage: string } {
        return {
            backgroundImage: `url(${process.env.VUE_APP_API_URL}files/${this.event.cover})`,
        }
    }

    get errorPayment(): string {
        if (this.$v.payment.$dirty && !this.$v.payment.required) {
            return "Выбор оплаты обязателен"
        }
        return ""
    }

    get date(): string {
        return dayjs(this.event.date).format("DD.MM.YYYY")
    }

    get time(): string {
        const start = dayjs(this.event.date).format("HH:mm")
        return `${start}-${this.event.end_time}`
    }

    changePayment(value: string): void {
        this.payment = value
    }

    closePopup(): void {
        this.$mainStore.popup.changeActiveRecordPopup(false)
    }

    async onClick(): Promise<void> {
        this.$v.$touch()
        if (this.$v.$invalid) return
        const params: statusData = {
            event_id:       this.event._id,
            payment_status: this.payment,
            event_status:   this.typesStatuses.go.name,
        }
        try {
            const res = await recordOnEvent(params)
            this.$mainStore.events.updateStatuses(res.data)
            this.$mainStore.popup.changeActiveRecordPopup(false)
            this.$mainStore.popup.setTypePayment(this.payment)
            this.$mainStore.popup.changeActivePaymentPopup(true)
            this.$mainStore.notification.changeNotification(
                { state: true, ...this.$mainNotification.successRecord })
        } catch (e) {
            this.$mainStore.notification.changeNotification(
                { state: true, ...this.$mainNotification.failedRecord })
            throw new Error(`Error create Statuses - ${e}`)
        }
    }
}
</script>
