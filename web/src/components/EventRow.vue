<template>
    <div
        class="event-row"
        :data-id="event._id"
    >
        <div class="event-row__head">
            <h2>{{ event.name }}</h2>
            <div class="event-row__date">
                <h4>Дата:<span>{{ date }}</span></h4>
                <h4>Время:<span>{{ time }}</span></h4>
            </div>
        </div>
        <div
            class="event-row__action"
            :class="{'event-row__action--open': openRecorded || openCanceled}"
        >
            <div
                v-if="event.recorded_users.length"
                class="event-row__more-btn"
                :class="{'event-row__more-btn--active': openRecorded}"
                @click="openRecordedList"
            >
                {{ textRecordedBtn }}
            </div>
            <div
                v-if="event.canceled_users.length"
                class="event-row__more-btn"
                :class="{'event-row__more-btn--active': openCanceled}"
                @click="openCanceledList"
            >
                {{ textCanceledBtn }}
            </div>
        </div>
        <div
            v-if="event.recorded_users.length"
            class="event-row__more"
        >
            <template v-if="openRecorded">
                <event-row-student
                    v-for="(user, index) in event.recorded_users"
                    :key="user.status_id"
                    :user="user"
                    :index="index"
                    :event-id="event._id"
                />
            </template>
        </div>
        <div
            v-if="event.canceled_users.length"
            class="event-row__more"
        >
            <template v-if="openCanceled">
                <event-row-student
                    v-for="(user, index) in event.canceled_users"
                    :key="user.status_id"
                    :user="user"
                    :index="index"
                    :event-id="event._id"
                />
            </template>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import EventRowStudent from "@/components/EventRowStudent.vue"
import { EventData } from "@/definitions/interfaces"
import dayjs from "dayjs"

@Component({
    components: {
        EventRowStudent,
    },
})
export default class EventRow extends Vue {
    
    @Prop({ type: Object })
    event!: EventData
    
    openRecorded = false
    openCanceled = false

    mounted(): void {
        if (this.$route.query?.id === this.event._id) {
            this.openRecorded = true
            const body = document.querySelector(".lk-body__wrapper")
            const rows = document.querySelectorAll(".event-row")
            const currentRow = [...rows].find(row => {
                const id = row.getAttribute("data-id")
                if (id === this.event._id) {
                    return row
                }
            })
            if (body && currentRow) {
                const { top: topRow } = currentRow.getBoundingClientRect()
                const { top: topBody } = body.getBoundingClientRect()
                const scroll = topRow - topBody
                body.scrollTo({
                    top:      scroll,
                    left:     0,
                    behavior: "smooth",
                })
            }

        }
    }

    get date(): string {
        return dayjs(this.event.date).format("DD.MM.YYYY")
    }

    get time(): string {
        const start = dayjs(this.event.date).format("HH:mm")
        return `${start}-${this.event.end_time}`
    }

    get isMobile(): boolean {
        return this.$mainStore.app.isMobile
    }

    get textRecordedBtn(): string {
        if (this.isMobile) {
            return `Участники ( ${this.event.recorded_users?.length} )`
        }
        if (this.openRecorded) {
            return `Закрыть список участников ( ${this.event.recorded_users?.length} )`
        }
        return `Открыть список участников ( ${this.event.recorded_users?.length} )`
    }

    get textCanceledBtn(): string {
        if (this.isMobile) {
            return `Беспредельщики ( ${this.event.canceled_users?.length} )`
        }
        if (this.openCanceled) {
            return `Закрыть список беспредельщиков ( ${this.event.canceled_users?.length} )`
        }
        return `Открыть список беспредельщиков ( ${this.event.canceled_users?.length} )`
    }

    openRecordedList(): void {
        this.openCanceled = false
        this.openRecorded = !this.openRecorded
    }

    openCanceledList(): void {
        this.openRecorded = false
        this.openCanceled = !this.openCanceled
    }

}
</script>

<style lang="scss">
   .event-row {
       margin-bottom: 30px;
       border-radius: 30px;
       background: $bg-info;
       padding: 30px 40px;
       color: $color-black;
       @media all and (max-width: 500px) {
           padding: 30px 20px;
       }
       &__head {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 20px;
           color: inherit;
           h2 {
               color: inherit;
               text-transform: uppercase;
           }
           @media all and (max-width: 1000px) {
               flex-direction: column;
               align-items: flex-start;
               h2 {
                   margin-bottom: 20px;
               }
           }
       }
       &__date {
           color: inherit;
           display: flex;
           h4 {
               margin-right: 45px;
               color: inherit;
               &:nth-last-of-type(1) {
                   margin-right: 0;
               }
               span {
                   margin-left: 10px;
                   color: inherit;
                   font-size: $font-size-big-text;
                   font-weight: 400;
               }
           }
           @media all and (max-width: 500px) {
               flex-direction: column;
               h4 {
                   margin-right: 0;
                   margin-bottom: 20px;
                   &:nth-last-of-type(1) {
                       margin-bottom: 0;
                   }
               }
           }
       }
       &__more {
           &-btn {
               display: inline-block;
               cursor: pointer;
               color: $color-gray;
               position: relative;
               margin-right: 40px;
               &:nth-last-of-type(1) {
                   margin-right: 0;
               }
               &::after {
                   transition: .5s;
                   content: "";
                   position: absolute;
                   top: 5px;
                   right: -20px;
                   border-style: solid;
                   border-width: 5.4px 5px 0 5px;
                   border-color: $color-gray transparent transparent transparent;
               }
               &--active {
                   margin-bottom: 30px;
                   &::after {
                       transform: rotate(180deg);
                       transform-origin: center;
                   }
               }
               @media all and (max-width: 440px) {
                   margin-bottom: 20px;
                   &:nth-last-of-type(1) {
                       margin-bottom: 0;
                   }
               }
           }
       }
       &__action {
           &--open {
               @media all and (max-width: 440px) {
                   margin-bottom: 20px;
               }
           }
       }
   }
</style>