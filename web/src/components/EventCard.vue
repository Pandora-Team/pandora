<template>
    <div
        class="event-card"
        :class="inlineClass"
        :style="inlineStyle"
    >
        <div class="event-card__wrapper">
            <div
                v-if="statuses.length"
                class="event-card__statuses"
            >
                <main-status
                    v-for="status in statuses"
                    :key="status.name"
                    :status="status"
                />
            </div>
            <div class="event-card__content">
                <h2>{{ event.name }}</h2>
                <div
                    class="event-card__date"
                    :class="{'event-card__date--mb': welcome}"
                >
                    <p>Дата: <span>{{ date }}</span></p>
                    <p>Время: <span>{{ time }}</span></p>
                </div>

                <p v-if="!welcome">
                    Адрес: <span>{{ event.address }}</span>
                </p>
                <p v-if="!welcome">
                    Стоимость: <span>{{ event.price }} р.</span>
                </p>
                <div
                    v-if="record"
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
                    v-if="!signedUp"
                    :full-width="true"
                    @click="onClick"
                >
                    Записаться
                </main-btn>
                <main-btn
                    v-if="signedUp"
                    :full-width="true"
                    view="error"
                    @click="onCancel"
                >
                    Отменить запись
                </main-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import MainStatus from "@/components/MainStatus.vue"
import MainBtn from "@/components/MainBtn.vue"
import { EventData } from "@/constants/interfaces"
import dayjs from "dayjs"
import { listStatuses, statusData, typesStatus, typeStatus } from "@/constants/typeStatus"
import MainRadio from "@/components/MainRadio.vue"
import { createStatuses } from "@/api/statuses"

@Component({
    components: {
        MainStatus,
        MainBtn,
        MainRadio,
    },
    validations: {
        payment: {
            required(value, vm) {
                return vm.record
            },
        },
    },
})
export default class EventCard extends Vue {

    @Prop({ type: Object, default: {} })
    event!: EventData

    @Prop({ type: String, default: "" })
    gridClass!: string

    @Prop({ type: Boolean, default: false })
    welcome!: boolean

    @Prop({ type: Boolean, default: false })
    record!: boolean

    statuses: typeStatus[] = []

    signedUp = false

    payment = ""

    typesStatuses = typesStatus

    @Watch("$mainStore.events.listEvents", { deep: true })
    update(): void {
        this.updateStatuses()
    }

    mounted(): void {
        this.updateStatuses()
    }

    get date(): string {
        return dayjs(this.event.date).format("DD.MM.YYYY")
    }

    get time(): string {
        const start = dayjs(this.event.date).format("HH:mm")
        return `${start}-${this.event.end_time}`
    }

    get inlineStyle(): { backgroundImage: string } {
        return {
            backgroundImage: `url(${process.env.VUE_APP_API_URL}events/${this.event.cover})`,
        }
    }

    get inlineClass(): any {
        return [
            {
                "event-card--welcome": this.welcome,
                "event-card--record":  this.record,
            },
            this.gridClass,
        ]
    }

    get errorPayment(): string {
        if (this.$v.payment.$dirty && !this.$v.payment.required) {
            return "Выбор оплаты обязателен"
        }
        return ""
    }

    updateStatuses(): void {
        this.statuses.splice(0, this.statuses.length)
        this.signedUp = false
        if (this.event?.status.length > 0) {
            this.event.status.forEach(status => {
                if (status === typesStatus.go.name) {
                    this.signedUp = true
                }
                const statusOutList = listStatuses.find(s => s.name === status)
                if (statusOutList) {
                    if (statusOutList.name === typesStatus.nearest.name && this.event.status.length > 1) {
                        return
                    }
                    this.statuses.push(statusOutList)
                }
            })
        }
    }

    changePayment(value: string): void {
        this.payment = value
    }

    async onClick(): Promise<void> {
        if (!this.record) {
            this.$mainStore.popup.changeRecordedState(this.event)
            this.$mainStore.popup.changeActiveRecordPopup(true)
        } else {
            this.$v.$touch()
            if (this.$v.$invalid) return
            const params: statusData = {
                event_id:       this.event._id,
                payment_status: this.payment,
                event_status:   this.typesStatuses.go.name,
            }
            try {
                const res = await createStatuses(params)
                this.$mainStore.events.updateStatuses(res.data)
                this.$mainStore.popup.changeActiveRecordPopup(false)
                this.$mainStore.popup.setTypePayment(this.payment)
                this.$mainStore.popup.changeActivePaymentPopup(true)
            } catch (e) {
                console.log(e)
            }
        }
    }

    //открытие попапа отмены
    onCancel(): void {
        this.$mainStore.popup.changeCanceledState(this.event)
        this.$mainStore.popup.changeActiveCancelPopup(true)
    }
}
</script>

<style lang="scss">
   .event-card {
       transition: .5s;
       width: 350px;
       height: 485px;
       border-radius: 30px;
       padding: 30px;
       color: $color-white;
       &:hover {
           box-shadow: 0 60px 50px -30px rgba(95, 38, 205, 0.3);
       }
       &--welcome {
           height: 393px!important;
       }
       &--record {
           color: $color-black!important;
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
       }
       &__wrapper {
           position: relative;
           width: 100%;
           height: 100%;
           color: inherit;
       }
       &__statuses {
           position: absolute;
           top: -15px;
           left: -15px;
       }
       &__content {
           position: absolute;
           bottom: 0;
           z-index: 1;
           width: 100%;
           color: inherit;
           h2 {
               color: inherit;
               font-weight: 700;
               margin-bottom: 15px;
               text-transform: uppercase;
           }
           p {
               color: inherit;
               margin-bottom: 15px;
               font-weight: 600;
               font-size: $font-size-big-text;
               line-height: $line-height-big-text;
               span {
                   color: inherit;
                   display: inline-block;
                   margin-left: 10px;
                   font-weight: 400;
                   font-size: $font-size-big-text;
                   line-height: $line-height-big-text;
               }
               &:nth-last-of-type(1) {
                   margin-bottom: 30px;
               }
           }
       }
       &__date {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 15px;
           p {
               margin-bottom: 0;
               &:nth-last-of-type(1) {
                   margin-bottom: 0;
               }
           }
           &--mb {
               margin-bottom: 30px;
           }
       }
       &__payment {
           transition: margin-bottom .5s;
           margin-bottom: 30px;
           color: inherit;
           &--mb {
               margin-bottom: 50px;
           }
           p {
               color: inherit;
               margin-bottom: 10px!important;
           }
       }
       &__error {
           font-size: 12px;
           position: absolute;
           color: #C03221;
       }
   }
</style>