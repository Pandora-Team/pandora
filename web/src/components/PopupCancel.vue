<template>
    <main-popup @close="closePopup">
        <div
            class="event-card event-card--cancel"
        >
            <div class="event-card__wrapper">
                <div class="event-card__content">
                    <h2>Хочешь отменить занятие? :(</h2>
                    <div class="event-card__action">
                        <main-btn
                            :auto-width="true"
                            view="error"
                            @click="onClick"
                        >
                            Да
                        </main-btn>
                        <main-btn
                            :auto-width="true"
                            @click="closePopup"
                        >
                            Ладно, я подумаю
                        </main-btn>
                    </div>
                </div>
            </div>
        </div>
    </main-popup>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { EventData } from "@/definitions/interfaces"
import MainPopup from "@/components/MainPopup.vue"
import EventCard from "@/components/EventCard.vue"
import MainBtn from "@/components/MainBtn.vue"
import { cancelRecordOnEvent } from "@/api/events"

@Component({
    components: {
        MainPopup,
        EventCard,
        MainBtn,
    },
})
export default class PopupCancel extends Vue {

    get event(): EventData {
        return this.$mainStore.popup.canceledState
    }

    closePopup(): void {
        this.$mainStore.popup.changeActiveCancelPopup(false)
    }

    async onClick(): Promise<void> {
        try {
            if (this.event.status_id) {
                await cancelRecordOnEvent(this.event.status_id)
                this.$mainStore.events.clearStatuses(this.event._id)
                this.closePopup()
                this.$mainStore.notification.changeNotification(
                    { state: true, ...this.$mainNotification.successCancel })
            }
        } catch (e) {
            this.$mainStore.notification.changeNotification({ state: true, ...this.$mainNotification.failedCancel })
            throw new Error(`Error clear Statuses - ${e}`)
        }
    }
}
</script>

<style lang="scss">
    .event-card {
        &--cancel {
            color: $color-black;
            background: url("../assets/bg/events-cancel.png") top no-repeat;
            background-size: contain;
            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                background: $gradient-white;
                width: 410px;
                height: 545px;
                border-radius: 30px;
                @media all and (max-width: 500px) {
                    width: 100%;
                }
            }
            &:hover {
                box-shadow: none!important;
            }
            h2 {
                margin-bottom: 30px;
            }
        }
        &__action {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            @media all and (max-width: 500px) {
                flex-direction: column;
                align-items: flex-start;
                .btn-wrapper:nth-of-type(1) {
                    margin-bottom: 20px;
                }
            }
        }
    }
</style>
