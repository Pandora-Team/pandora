<template>
    <div
        class="event-card"
        :style="inlineStyle"
    >
        <div class="event-card__wrapper">
            <main-status
                :type="$typeStatusEvent.actual"
                :position="{top: '-28px', left: '-18px'}"
            />
            <div class="event-card__content">
                <h2>{{ event.title }}</h2>
                <p>{{ event.date }}</p>
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

interface eventData {
    title: string
    date: string
    background: string
}

import { Component, Prop, Vue } from "vue-property-decorator"
import MainStatus from "@/components/MainStatus.vue"
import MainBtn from "@/components/MainBtn.vue"

@Component({
    components: {
        MainStatus,
        MainBtn,
    },
})
export default class EventCard extends Vue {

    @Prop({ type: Object, default: {} })
    event!: eventData

    onClick():void {
        return
    }

    get bgImage() {
        return require(`@/assets/bg/${this.event.background}`)
    }
    get inlineStyle() {
        return {
            backgroundImage: `url(${this.bgImage})`,
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
               margin-bottom: 40px;
           }
       }
   }
</style>