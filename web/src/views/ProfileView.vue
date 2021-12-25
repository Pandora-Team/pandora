<template>
    <div class="profile">
        <h1>Мой профиль</h1>
        <div class="profile-block">
            <info-card inline-class="profile">
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
            <!--<profile-events />-->
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

@Component({
    components: {
        InfoCard,
        ProfileCard,
        ProfileEvents,
        ProfileCardEdit,
        TransitionFade,
    },
})
export default class ProfileView extends Vue {

    edit = false

    changeEdit(active: boolean): void {
        this.edit = active
    }

}
</script>

<style lang="scss">
    .profile {
        &-block {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 40px;
            grid-auto-rows: auto;
            @media all and (max-width: 800px) {
                grid-template-columns: auto;
                justify-content: center;
                .info-card.profile {
                    max-width: 400px;
                }
            }
            @media all and (max-width: 500px) {
                justify-content: inherit;
                .info-card.profile {
                    padding: 30px;
                }
            }
        }
    }
</style>