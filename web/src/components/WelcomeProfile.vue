<template>
    <div class="info-card__wrapper info-card__wrapper--profile">
        <div class="info-card__content">
            <h3 @click="onClick">
                Мой профиль
            </h3>
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

import { Component, Prop, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"

@Component({
    components: {
        LkAvatar,
    },
})
export default class WelcomeProfile extends Vue {

    @Prop({ type: String, default: "" })
    readonly path!: string

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

    onClick(): void {
        if (this.path) {
            this.$router.push({ path: this.path })
        }
    }

}
</script>

<style lang="scss">
    .info-card__content {
        h3 {
            cursor: pointer;
        }
    }
</style>