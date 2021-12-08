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
                <lk-avatar />
            </div>
            <div class="event-row__student-name">
                {{ user.name }}
            </div>
        </div>
        <div class="event-row__student-payment">
            <p>Способ оплаты: <b>{{ currentPayment }}</b></p>
            <div class="event-row__student-action">
                <btn-status
                    v-if="visiblePayment"
                    :status="typesStatus.paid"
                    @click="setPayment"
                />
            </div>
        </div>
        <div class="event-row__student-visit">
            <p>Статус посещения: <b>{{ currentVisit }}</b></p>
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
            throw new Error(`Error update Statuses - ${e}`)
        }
    }
}
</script>

<style lang="scss">
   .event-row__student {
       display: flex;
       justify-content: space-between;
       align-items: center;
       padding: 16px 30px;
       background: $color-white;
       border-radius: 30px;
       &--variants {
           padding-bottom: 56px;
       }
       &-block {
           display: flex;
           align-items: center;
       }
       &-number {
           margin-right: 36px;
       }
       &-avatar {
           margin-right: 20px;
       }
       &-name {

       }
       &-payment {
           position: relative;
           p {
               margin-bottom: 0;
               b {
                   margin-left: 20px;
               }
           }
       }
       &-visit {
           position: relative;
           p {
               margin-bottom: 0;
               b {
                   margin-left: 20px;
               }
           }
       }
       &-action {
           position: absolute;
           right: 0;
           top: 35px;
       }
   }
</style>