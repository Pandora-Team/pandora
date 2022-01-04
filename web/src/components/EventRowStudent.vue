<template>
    <div
        class="event-row__student"
        :class="inlineClass"
    >
        <div class="event-row__student-block">
            <div class="event-row__student-number">
                {{ number }}
            </div>
            <div class="event-row__student-avatar">
                <lk-avatar
                    :path="user.avatar"
                    :student="true"
                />
            </div>
            <div class="event-row__student-name">
                {{ fullName }}
            </div>
        </div>
        <div class="event-row__student-status">
            <div class="event-row__student-payment">
                <div class="event-row__student-title">
                    Способ оплаты:
                    <div class="event-row__student-value">
                        <b>{{ currentPayment }}</b>
                        <div class="event-row__student-action">
                            <btn-status
                                v-if="visiblePayment"
                                :status="typesStatus.paid"
                                @click="setPayment"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="event-row__student-visit">
                <div class="event-row__student-title">
                    Статус посещения:
                    <div class="event-row__student-value">
                        <b>{{ currentVisit }}</b>
                        <div class="event-row__student-action">
                            <btn-status
                                v-if="visibleVisit"
                                :status="typesStatus.visited"
                                @click="setVisit"
                            />
                            <btn-status
                                v-if="visibleVisit"
                                :status="typesStatus.notVisited"
                                @click="setVisit"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import BtnStatus from "@/components/BtnStatus.vue"
import { typesStatus, listStatuses } from "@/definitions/typeStatus"
import LkAvatar from "@/components/LkAvatar.vue"
import { updateStatuses } from "@/api/statuses"
import { UserInfo } from "@/definitions/interfaces"

@Component({
    components: {
        BtnStatus,
        LkAvatar,
    },
})
export default class EventRowStudent extends Vue {

    @Prop({ type: Object })
    user!: UserInfo

    @Prop({ type: Number })
    index!: number

    @Prop({ type: String, default: "" })
    eventId!: string

    typesStatus = typesStatus

    get fullName(): string {
        return `${this.user.name} ${this.user.surname}`
    }

    get number(): number {
        return this.index + 1
    }

    get currentPayment(): string {
        const payment = listStatuses.find(status => status.name === this.user.payment_status)
        if (payment) {
            return payment.title
        }
        return ""
    }

    get currentVisit(): string {
        const visit = listStatuses.find(status => status.name === this.user.event_status)
        if (visit) {
            if (visit.name !== this.typesStatus.go.name) {
                return visit.title
            }
            return "Планирует прийти"
        }
        return ""
    }

    get visiblePayment(): boolean {
        return this.user.payment_status !== this.typesStatus.paid.name
    }

    get visibleVisit(): boolean {
        return !(this.user.event_status === this.typesStatus.notVisited.name
            || this.user.event_status === this.typesStatus.visited.name)
    }

    get inlineClass(): string {
        if (this.visiblePayment || this.visibleVisit) {
            return "event-row__student--variants"
        }
        return ""
    }

    async setPayment(status: UserInfo): Promise<void> {
        try {
            const params = {
                payment_status: status.name,
            }
            await updateStatuses(this.user.status_id, params)
            const paramsForStore = {
                eventId:       this.eventId,
                statusId:      this.user.status_id,
                paymentStatus: status.name,
            }
            this.$mainStore.students.updateStatusPayment(paramsForStore)
        } catch (e) {
            this.$mainStore.notification.changeNotification({ state: true, ...this.$mainNotification.error })
            throw new Error(`Error update Statuses - ${e}`)
        }
    }

    async setVisit(status: UserInfo): Promise<void> {
        try {
            const params = {
                event_status: status.name,
            }
            await updateStatuses(this.user.status_id, params)
            const paramsForStore = {
                eventId:     this.eventId,
                statusId:    this.user.status_id,
                eventStatus: status.name,
            }
            this.$mainStore.students.updateStatusEvent(paramsForStore)
        } catch (e) {
            this.$mainStore.notification.changeNotification({ state: true, ...this.$mainNotification.error })
            throw new Error(`Error update Statuses - ${e}`)
        }
    }
}
</script>

<style lang="scss">
   .event-row__student {
       display: flex;
       align-items: center;
       padding: 16px 30px;
       background: $color-white;
       border-radius: 30px;
       margin-bottom: 20px;
       @media all and (max-width: 1600px) {
           align-items: flex-start;
       }
       @media all and (max-width: 800px) {
           flex-direction: column;
           align-items: flex-start;
           padding: 16px 20px;
       }
       &--variants {
           padding-bottom: 56px;
           @media all and (max-width: 500px) {
               padding-bottom: 16px;
           }
       }
       &-block {
           width: 35%;
           display: flex;
           align-items: center;
           @media all and (max-width: 800px) {
               margin-bottom: 20px;
           }
           @media all and (max-width: 500px) {
               width: 100%;
           }
       }
       &-number {
           margin-right: 36px;
       }
       &-avatar {
           margin-right: 20px;
       }
       &-name {

       }
       &-status {
           display: flex;
           width: 65%;
           @media all and (max-width: 1600px) {
               flex-direction: column;
           }
           @media all and (max-width: 500px) {
               width: 100%;
           }
       }
       &-payment {
           width: 50%;
           @media all and (max-width: 1700px) {
               position: relative;
           }
           @media all and (max-width: 1600px) {
               width: 100%;
               height: 100px;
           }
           @media all and (max-width: 500px) {
               margin-bottom: 20px;
               height: auto;
           }
       }
       &-visit {
           width: 50%;
           @media all and (max-width: 1700px) {
               position: relative;
           }
           @media all and (max-width: 1600px) {
               width: 100%;
               height: 30px;
           }
           @media all and (max-width: 500px) {
               height: auto;
           }
       }
       &-title {
           display: flex;
           margin-bottom: 0;
           white-space: nowrap;
           @media all and (max-width: 500px) {
               flex-direction: column;
               line-height: 24px;
               margin-bottom: 10px;
               b {
                   display: block;
                   margin-bottom: 10px;
               }
           }
       }
       &-value {
           width: 100%;
           position: relative;
           margin-left: 20px;
           @media all and (max-width: 1700px) {
               position: static;
           }
           @media all and (max-width: 500px) {
               margin-left: 0;
           }
       }
       &-action {
           position: absolute;
           left: 0;
           top: 35px;
           @media all and (max-width: 500px) {
               position: relative;
               top: 0;
               display: flex;
               flex-direction: column;
               .btn-status {
                   text-align: center;
                   &:nth-of-type(1) {
                       margin-right: 0;
                       margin-bottom: 10px;
                   }
               }
           }
       }

   }
</style>