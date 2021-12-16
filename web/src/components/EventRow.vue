<template>
    <div class="event-row">
        <div class="event-row__head">
            <h2>{{ event.name }}</h2>
            <div class="event-row__date">
                <h4>Дата:<span>{{ date }}</span></h4>
                <h4>Время:<span>{{ time }}</span></h4>
            </div>
        </div>
        <div
            v-if="event.users.length"
            class="event-row__more"
        >
            <div
                class="event-row__more-btn"
                :class="{'event-row__more-btn--active': open}"
                @click="openList"
            >
                {{ textBtn }}
            </div>
            <template v-if="open">
                <event-row-student
                    v-for="(user, index) in event.users"
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
    
    open = false

    get date(): string {
        return dayjs(this.event.date).format("DD.MM.YYYY")
    }

    get time(): string {
        const start = dayjs(this.event.date).format("HH:mm")
        return `${start}-${this.event.end_time}`
    }

    get textBtn(): string {
        if (this.open) {
            return "Закрыть список участников"
        }
        return "Открыть список участников"
    }

    openList(): void {
        this.open = !this.open
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
       &__head {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 15px;
           color: inherit;
           h2 {
               color: inherit;
               text-transform: uppercase;
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
       }
       &__more {
           &-btn {
               display: inline-block;
               cursor: pointer;
               color: $color-gray;
               position: relative;
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
           }
       }
   }
</style>