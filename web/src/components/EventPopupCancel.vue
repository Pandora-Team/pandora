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
import { EventData } from "@/constants/interfaces"
import MainPopup from "@/components/MainPopup.vue"
import EventCard from "@/components/EventCard.vue"
import MainBtn from "@/components/MainBtn.vue"
import { clearStatuses } from "@/api/statuses"

@Component({
    components: {
        MainPopup,
        EventCard,
        MainBtn,
    },
})
export default class EventPopupCancel extends Vue {

    get event(): EventData {
        return this.$mainStore.popup.canceledState
    }

    closePopup(): void {
        this.$mainStore.popup.changeActiveCancelPopup(false)
    }

    async onClick(): Promise<void> {
        try {
            await clearStatuses(this.event.status_id)
            this.$mainStore.events.clearStatuses(this.event._id)
            this.closePopup()
        } catch (e) {
            console.warn("Очистка статусов не прошла")
            console.log(e)
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
        }
    }
</style>
