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

    onClick():void {
        this.$mainStore.popup.changeActiveCreatePopup(true)
    }
}
</script>

<style lang="scss">
   .event-card {
       &--create {
           border: 2px dashed $color-gray;
           position: relative;
           cursor: pointer;
           &::before {
               content: "";
               width: 64px;
               height: 2px;
               background: $color-gray;
               position: absolute;
               top: calc( 50% - 1px );
               left: calc( 50% - 32px );
           }
           &::after {
               content: "";
               width: 2px;
               height: 64px;
               background: $color-gray;
               position: absolute;
               top: calc( 50% - 32px );
               left: calc( 50% - 1px );
           }
       }
   }
</style>