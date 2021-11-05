<template>
    <div class="info-card__wrapper info-card__wrapper--profile">
        <div class="info-card__content">
            <h3>Мой профиль</h3>
            <h4>{{ fullName }}</h4>
            <p
                v-if="birthday"
                class="birthday"
            >
                День рождения: <span>{{ birthday }}</span>
            </p>
        </div>
        <div class="info-card__pic">
            <lk-avatar width="max" />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"

@Component({
    components: {
        LkAvatar,
    },
})
export default class WelcomeProfile extends Vue {

    get name(): string {
        return this.$mainStore.user.name
    }

    get surname(): string {
        return this.$mainStore.user.surname
    }

    get fullName(): string {
        return `${this.surname} ${this.name}`
    }

    get birthday(): string {
        return this.$mainStore.user.birthday
    }

}
</script>

<style lang="scss">

</style>