<template>
    <div class="profile">
        <h1>Мой профиль</h1>
        <div class="profile-block">
            <profile-card />
            <profile-events />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import InfoCard from "@/components/InfoCard.vue"
import ProfileCard from "@/components/ProfileCard.vue"
import ProfileEvents from "@/components/ProfileEvents.vue"

@Component({
    components: {
        InfoCard,
        ProfileCard,
        ProfileEvents,
    },
})
export default class ProfileView extends Vue {

}
</script>

<style lang="scss">
    .profile {
        &-block {
            display: flex;
        }
    }
</style>