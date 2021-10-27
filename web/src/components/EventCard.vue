<template>
    <div
        class="event-card"
        :class="gridClass"
        :style="inlineStyle"
    >
        <div class="event-card__wrapper">
            <!--<main-status
                :type="$typeStatusEvent.actual"
                :position="{top: '-28px', left: '-18px'}"
            />-->
            <div class="event-card__content">
                <h2>{{ event.name }}</h2>
                <p>{{ dateAndTime }}</p>
                <p>{{ event.address }}</p>
                <p>Стоимость: {{ event.price }} рублей</p>
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

    get dateAndTime(): string {
        const date = dayjs(this.event.date).format("DD.MM.YYYY")
        const start = dayjs(this.event.date).format("HH:mm")
        return `${date} с ${start} до ${this.event.end_time}`
    }

    onClick():void {
        return
    }

    get inlineStyle(): { backgroundImage: string } {
        return {
            backgroundImage: `url(${process.env.VUE_APP_API_URL}events/${this.event.cover})`,
        }
    }
}
</script>

<style lang="scss">
   .event-card {
       width: 350px;
       height: 465px;
       border-radius: 30px;
       padding: 40px 30px;
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
               color: white;
               margin-bottom: 20px;
               text-transform: uppercase;
           }
           p {
               color: white;
               margin-bottom: 20px;
               &:nth-last-of-type(1) {
                   margin-bottom: 40px;
               }
           }
       }
   }
</style>