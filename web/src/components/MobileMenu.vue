<template>
    <div
        class="mobile-menu"
    >
        <div class="mobile-menu__top">
            <lk-social />
            <hamburger-icon @show="showMenu" />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkSocial from "@/components/LkSocial.vue"
import HamburgerIcon from "@/components/HamburgerIcon.vue"

@Component({
    components: {
        LkSocial,
        HamburgerIcon,
    },
})
export default class MobileMenu extends Vue {
    showMenu(): void {
        return
    }
}
</script>

<style lang="scss">
    .mobile-menu {
        position: fixed;
        top: 0;
        width: calc(100% - 40px);
        height: 40px;
        padding: 20px;
        background: $color-black;
        &__top {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>