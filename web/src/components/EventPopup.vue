<template>
    <div class="event-popup">
        <div class="event-popup__body">
            <div
                class="event-popup__exit"
                @click="closePopup"
            >
                Закрыть
            </div>
            <h3>Создание занятия</h3>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class EventPopup extends Vue {

    onClick():void {
        return
    }

    eventStore = this.$mainStore.events
    appStore = this.$mainStore.app

    closePopup() {
        this.eventStore.changePopup(false)
        this.appStore.setDisabled(false)
    }
}
</script>

<style lang="scss">
    .event-popup {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;
        &__exit {
            position: absolute;
            top: 20px;
            right: 40px;
            cursor: pointer;
        }
        &__body {
            position: relative;
            max-width: 800px;
            width: 100%;
            height: 800px;
            border-radius: 25px;
            background: white;
            padding: 40px;
            h3 {
                text-align: center;
            }
        }
    }
</style>