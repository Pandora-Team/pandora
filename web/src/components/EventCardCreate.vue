<template>
    <div
        class="event-card event-card--create"
        @click="onClick"
    />
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class EventCardCreate extends Vue {

    eventStore = this.$mainStore.events
    appStore = this.$mainStore.app

    onClick():void {
        this.eventStore.changePopup(true)
        this.appStore.setDisabled(true)
    }
}
</script>

<style lang="scss">
   .event-card {
       width: 350px;
       height: 465px;
       border-radius: 30px;
       padding: 40px 30px;
       &--create {
           border: 1px solid #000000;
           position: relative;
           cursor: pointer;
           &::before {
               content: "";
               width: 40px;
               height: 2px;
               background: #222222;
               position: absolute;
               top: calc( 50% - 1px );
               left: calc( 50% - 20px );
           }
           &::after {
               content: "";
               width: 2px;
               height: 40px;
               background: #222222;
               position: absolute;
               top: calc( 50% - 20px );
               left: calc( 50% - 1px );
           }
       }
   }
</style>