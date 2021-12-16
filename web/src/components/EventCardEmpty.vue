<template>
    <div
        class="event-card event-card--empty"
        :class="gridClass"
    >
        <div class="event-card__wrapper">
            <div class="event-card__content">
                <h2>Треня совсем скоро...</h2>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"

@Component({})
export default class EventCardEmpty extends Vue {
    @Prop({ type: String, default: "" })
    gridClass!: string
}
</script>

<style lang="scss">
   .event-card {
       &--empty {
           height: auto;
           background-image: url("../assets/bg/not_mk.jpg");
           width: auto;
       }
   }
</style>