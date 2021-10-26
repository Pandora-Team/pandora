<template>
    <div class="nav">
        <lk-nav-link
            name="Главная"
            path="/lk"
            icon="home"
        />
        <lk-nav-link
            name="Классы"
            path="/lk/classes"
            icon="master"
        />
        <lk-nav-link
            name="Участники"
            path="/lk/students"
            icon="master"
        />
        <lk-nav-link
            name="Профиль"
            path="/lk/profile"
            icon="profile"
        />
        <lk-nav-link
            name="О нас"
            path="/lk/about"
            icon="about"
        />
        <lk-nav-link
            name="Правила"
            path="/lk/rules"
            icon="rule"
        />
        <lk-nav-link
            name="События"
            path="/lk/storage"
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

}
</script>

<style lang="scss">

</style>