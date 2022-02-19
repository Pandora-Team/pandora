<template>
    <div
        class="event-card"
        :class="inlineClass"
        :style="inlineStyle"
    >
        <div class="event-card__wrapper">
            <div
                v-if="isAdmin"
                class="event-card__edit"
                @click="onEdit"
            />
            <div
                v-if="event.discount"
                class="event-card__discount"
            >
                20%
            </div>
            <div
                v-if="isAdmin && event.recorded.length"
                class="event-card__number"
            >
                {{ numberUsers }}
            </div>
            <div
                v-if="!isAdmin && statuses.length"
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
                    <p>Дата:&nbsp;<span>{{ date }}</span></p>
                    <p>Время:&nbsp;<span>{{ time }}</span></p>
                </div>

                <p v-if="!welcome">
                    Адрес: <span>{{ event.address }}</span>
                </p>
                <p v-if="!welcome">
                    Стоимость: <span>{{ event.price }} р.</span>
                </p>
                <main-btn
                    v-if="visibleRecordBtn"
                    :full-width="true"
                    @click="onClick"
                >
                    Записаться
                </main-btn>
                <main-btn
                    v-if="signedUp && !isAdmin"
                    :full-width="true"
                    view="error"
                    @click="onCancel"
                >
                    Отменить запись
                </main-btn>
                <main-btn
                    v-if="isAdmin"
                    :full-width="true"
                    view="error"
                    @click="onRemove"
                >
                    Отменить занятие
                </main-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import MainStatus from "@/components/MainStatus.vue"
import MainBtn from "@/components/MainBtn.vue"
import { EventData, styleClass } from "@/definitions/interfaces"
import dayjs from "dayjs"
import { listStatuses, typesStatus, typeStatus } from "@/definitions/typeStatus"
import MainRadio from "@/components/MainRadio.vue"
import { includes } from "lodash"
import { enumerate } from "@/definitions/helpers"

@Component({
    components: {
        MainStatus,
        MainBtn,
        MainRadio,
    },
})
export default class EventCard extends Vue {

    @Prop({ type: Object, default: {} })
    event!: EventData

    @Prop({ type: String, default: "" })
    gridClass!: string

    @Prop({ type: Boolean, default: false })
    welcome!: boolean

    statuses: typeStatus[] = []

    signedUp = false

    typesStatuses = typesStatus

    @Watch("$mainStore.events.listEvents", { deep: true })
    update(): void {
        this.updateStatuses()
    }

    @Watch("$mainStore.events.nearestEvent", { deep: true })
    updateNearestEvent(): void {
        this.updateStatuses()
    }

    mounted(): void {
        this.updateStatuses()
    }

    get visibleRecordBtn(): boolean {
        if (includes(this.statuses, typesStatus.visited)) {
            return false
        }
        return !this.signedUp && !this.isAdmin
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
            backgroundImage: `url(${process.env.VUE_APP_API_URL}files/${this.event.cover})`,
        }
    }

    get inlineClass(): styleClass {
        return [
            {
                "event-card--welcome": this.welcome,
            },
            this.gridClass,
        ]
    }

    get isAdmin(): boolean {
        return this.$mainStore.user.isAdmin
    }

    get numberUsers(): string | undefined {
        if (this.event.recorded?.length) {
            return `${this.event.recorded.length} ${enumerate(this.event.recorded.length, ["участник", "участника", "участников"])}`
        }
        return undefined
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

    async onClick(): Promise<void> {
        this.$mainStore.popup.changeRecordedState(this.event)
        this.$mainStore.popup.changeActiveRecordPopup(true)
    }

    //открытие попапа отмены
    onCancel(): void {
        this.$mainStore.popup.changeCanceledState(this.event)
        this.$mainStore.popup.changeActiveCancelPopup(true)
    }

    //удаление занятия
    async onRemove(): Promise<void> {
        this.$mainStore.popup.changeRemovedState(this.event)
        this.$mainStore.popup.changeActiveRemovePopup(true)
    }

    onEdit(): void {
        this.$mainStore.popup.changeCreatedState(this.event)
        this.$mainStore.popup.changeActiveCreatePopup(true)
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
       background-position: center;
       background-size: cover;
       position: relative;
       /*@media all and (min-width: 500px) {
           &:hover {
               box-shadow: 0 60px 50px -30px rgba(95, 38, 205, 0.3);
           }
       }*/
       &:before {
           content: '';
           width: 100%;
           height: 100%;
           background: linear-gradient(360deg, #14082C -13.75%, rgba(94, 42, 195, 0) 100%);
           position: absolute;
           left: 0;
           top: 0;
           border-radius: 30px;
       }
       &--welcome {
           //height: 393px!important;
           height: 100%;
           width: auto;
           box-sizing: border-box;

           .btn {
               min-width: auto;
           }
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
               @media all and (max-width: 500px) {
                   width: 100%;
               }
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
       &__number {
           cursor: default;
           position: absolute;
           top: -15px;
           left: -15px;
           border-radius: 15px;
           background: $color-green;
           display: inline-flex;
           justify-content: center;
           align-items: center;
           padding: 10px;
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
                   //margin-left: 10px;
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
               &:first-of-type {
                   padding-right: 10px;
               }
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
       &__edit {
           cursor: pointer;
           position: absolute;
           top: -30px;
           right: -30px;
           width: 54px;
           height: 55px;
           background: $color-gray url("../assets/svg/icon-edit.svg") center no-repeat;
           background-size: 29px;
           border-radius: 0 20px 0 20px;
           color: white;
       }
       &__discount {
           position: absolute;
           top: -30px;
           right: -30px;
           width: 54px;
           height: 55px;
           background: $color-hover;
           background-size: 29px;
           border-radius: 0 20px 0 20px;
           display: flex;
           justify-content: center;
           align-items: center;
           font-size: $font-size-big-text;
           line-height: $line-height-big-text;
           font-weight: 600;
       }
   }

    @media all and(max-width: 1366px) {
        .event-card {
            &__content {
                h2 {
                    font-size: 22px;
                    line-height: 27px;
                }
            }
        }
    }
</style>