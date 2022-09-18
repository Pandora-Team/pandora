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
        this.$router.push({ path: this.$mainPaths.ClassesAddView })
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
               width: 64px!important;
               height: 2px!important;
               background: $color-gray!important;
               position: absolute;
               top: calc( 50% - 1px )!important;
               left: calc( 50% - 32px )!important;
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