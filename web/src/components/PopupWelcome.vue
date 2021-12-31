<template>
    <main-popup @close="closePopup">
        <div
            class="event-card event-card--welcome_popup"
        >
            <div class="event-card__wrapper">
                <div class="event-card__content">
                    <h2>Привет!</h2>
                    <p>
                        Добро пожаловать в PANDORA! Мы рады видеть тебя в наших к-поп рядах.<br>
                        В личном кабинете ты найдёшь много полезной информации, а также сможешь записаться на МК.
                    </p>
                    <p>Все наши участники состоят в чате Telegram, ссылка-приглашение ждёт тебя в разделе «Профиль».</p>
                    <div class="event-card__action">
                        <main-btn
                            :full-width="true"
                            @click="closePopup"
                        >
                            Супер!
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

@Component({
    components: {
        MainPopup,
        EventCard,
        MainBtn,
    },
})
export default class PopupWelcome extends Vue {

    get event(): EventData {
        return this.$mainStore.popup.canceledState
    }

    closePopup(): void {
        this.$mainStore.popup.changeActiveWelcomePopup(false)
    }
}
</script>

<style lang="scss">
    .event-card {
        &--welcome_popup {
            color: $color-black;
            background: url("../assets/bg/popup-welcome.jpg") top no-repeat;
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
            p {
                font-size: 16px;
                font-weight: 400;
                margin-bottom: 30px;
            }
            .event-card__action {
                margin-bottom: 0;
            }
            @media all and (max-width: 500px) {
                width: calc(100% - 60px);
            }
        }

    }
</style>
