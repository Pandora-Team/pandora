<template>
    <div class="nav">
        <lk-nav-link
            name="Главная"
            :path="$mainPaths.LkLayout"
            icon="home"
        />
        <lk-nav-link
            name="Классы"
            :path="$mainPaths.ClassesView"
            icon="master"
        />
        <lk-nav-link
            v-if="isAdmin"
            name="Участники"
            :path="$mainPaths.ListEventsView"
            :inner-path="$mainPaths.ListStudentsView"
            icon="students"
        />
        <lk-nav-link
            name="Профиль"
            :path="$mainPaths.ProfileView"
            icon="profile"
        />
        <lk-nav-link
            name="О нас"
            :path="$mainPaths.AboutView"
            icon="about"
        />
        <lk-nav-link
            name="Правила"
            :path="$mainPaths.RulesView"
            icon="rule"
        />
        <lk-nav-link
            name="События"
            :path="$mainPaths.StorageView"
            icon="events"
        />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkNavLink from "@/components/LkNavLink.vue"

@Component({
    components: {
        LkNavLink,
    },
})
export default class LkNav extends Vue {
    get isAdmin(): boolean {
        return this.$mainStore.user.isAdmin
    }
}
</script>

<style lang="scss">

</style>