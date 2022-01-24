<template>
    <div class="profile">
        <h1>Мой профиль</h1>
        <div class="profile__telegram">
            <main-btn
                type="link"
                url="https://t.me/+yInFhfRRC7FiMTIy"
                :full-width="true"
                icon="telegram"
                :external-link="true"
            >
                {{ textBtnTg }}
            </main-btn>
        </div>
        <div class="profile-block">
            <info-card inline-class="profile-card">
                <transition-fade>
                    <profile-card
                        v-if="!edit"
                        @edit="changeEdit"
                    />
                    <profile-card-edit
                        v-else
                        @edit="changeEdit"
                    />
                </transition-fade>
            </info-card>
            <profile-events />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import InfoCard from "@/components/InfoCard.vue"
import ProfileCard from "@/components/ProfileCard.vue"
import ProfileEvents from "@/components/ProfileEvents.vue"
import ProfileCardEdit from "@/components/ProfileCardEdit.vue"
import TransitionFade from "@/components/transition/TransitionFade.vue"
import MainBtn from "@/components/MainBtn.vue"

@Component({
    components: {
        InfoCard,
        ProfileCard,
        ProfileEvents,
        ProfileCardEdit,
        TransitionFade,
        MainBtn,
    },
})
export default class ProfileView extends Vue {

    edit = false

    changeEdit(active: boolean): void {
        this.edit = active
    }

    get textBtnTg(): string {
        if (this.isMobile) return "Чат участников"
        return "Присоединиться к закрытому чату участников"
    }

    get isMobile(): boolean {
        return this.$mainStore.app.isMobile
    }

}
</script>

<style lang="scss">
    .profile {
        @media all and (max-width: 500px) {
            margin-top: 90px;
        }
        &__telegram {
            margin-bottom: 36px;
        }
        &-block {
            display: flex;
            align-items: flex-start;
            .info-card.profile-card {
                max-width: 700px;
                box-sizing: border-box;
                width: 100%;
            }
            @media all and (max-width: 1500px) {
                flex-direction: column;
            }
            @media all and (max-width: 800px) {

            }
            @media all and (max-width: 500px) {
                .info-card.profile-card {
                    padding: 30px;
                }
            }
        }
    }
</style>