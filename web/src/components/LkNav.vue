<template>
    <div class="nav">
        <lk-nav-link
            name="Главная"
            path="/lk"
        />
        <lk-nav-link
            name="Классы"
            path="/lk/events"
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