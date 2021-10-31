<template>
    <div class="info-card__wrapper info-card__wrapper--profile">
        <div class="info-card__content">
            <h3>Мой профиль</h3>
            <h4>{{ name }}</h4>
            <!--<p class="birthday">
                День рождения: <span>28.03.1996</span>
            </p>-->
        </div>
        <div class="info-card__pic">
            <img
                src="@/assets/images/not-avatar.png"
                alt="non-avatar"
            >
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"

@Component({
    components: {},
})
export default class WelcomeProfile extends Vue {

    name = ""

    @Watch("$mainStore.user.name", { immediate: true })
    updateName(): void {
        this.name = this.$mainStore.user.name
    }

}
</script>

<style lang="scss">

</style>