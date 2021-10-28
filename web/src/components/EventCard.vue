<template>
    <div
        class="event-card"
        :class="inlineClass"
        :style="inlineStyle"
    >
        <div class="event-card__wrapper">
            <main-status
                :type="$typeStatusEvent.nearest"
                :position="{top: '-15px', left: '-15px'}"
            />
            <div class="event-card__content">
                <h2>{{ event.name }}</h2>
                <div
                    class="event-card__date"
                    :class="{'event-card__date--mb': nearest}"
                >
                    <p>Дата: <span>{{ date }}</span></p>
                    <p>Время: <span>{{ time }}</span></p>
                </div>

                <p v-if="!nearest">
                    Адрес: <span>{{ event.address }}</span>
                </p>
                <p v-if="!nearest">
                    Стоимость: <span>{{ event.price }} р.</span>
                </p>
                <main-btn
                    :full-width="true"
                    @click="onClick"
                >
                    Записаться
                </main-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import MainStatus from "@/components/MainStatus.vue"
import MainBtn from "@/components/MainBtn.vue"
import { EventData } from "@/constants/interfaces"
import dayjs from "dayjs"

@Component({
    components: {
        MainStatus,
        MainBtn,
    },
})
export default class EventCard extends Vue {

    @Prop({ type: Object, default: {} })
    event!: EventData

    @Prop({ type: String, default: "" })
    gridClass!: string

    @Prop({ type: Boolean, default: false })
    nearest!: boolean

    get date(): string {
        return dayjs(this.event.date).format("DD.MM.YYYY")
    }

    get time(): string {
        const start = dayjs(this.event.date).format("HH:mm")
        return `${start}-${this.event.end_time}`
    }

    onClick():void {
        return
    }

    get inlineStyle(): { backgroundImage: string } {
        return {
            backgroundImage: `url(${process.env.VUE_APP_API_URL}events/${this.event.cover})`,
        }
    }

    get inlineClass(): any {
        return [
            {
                "event-card--welcome": this.nearest,
            },
            this.gridClass,
        ]
    }
}
</script>

<style lang="scss">
   .event-card {
       width: 350px;
       height: 485px;
       border-radius: 30px;
       padding: 30px;
       &--welcome {
           height: 373px!important;
       }
       &__wrapper {
           position: relative;
           width: 100%;
           height: 100%;
       }
       &__content {
           position: absolute;
           bottom: 0;
           width: 100%;
           h2 {
               color: $color-white;
               font-weight: 700;
               margin-bottom: 15px;
               text-transform: uppercase;
           }
           p {
               color: $color-white;
               margin-bottom: 15px;
               font-weight: 600;
               font-size: $font-size-big-text;
               line-height: $line-height-big-text;
               span {
                   color: $color-white;
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
   }
</style>