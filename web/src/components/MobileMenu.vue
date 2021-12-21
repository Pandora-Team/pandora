<template>
    <div
        class="mobile-menu"
        :class="{'mobile-menu--active': visibleMobileMenu}"
    >
        <div class="mobile-menu__top">
            <lk-social />
            <hamburger-icon
                :visible="visibleMobileMenu"
                @show="showMenu"
            />
        </div>
        <transition-fade>
            <div
                v-show="visibleMobileMenu"
                class="mobile-menu__content"
            >
                <div class="mobile-menu__center">
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
                    <!--<lk-nav-link
                        name="События"
                        :path="$mainPaths.StorageView"
                        icon="events"
                    />-->
                </div>
                <div class="mobile-menu__logout">
                    <lk-logout text="Выйти" />
                </div>
                <div class="mobile-menu__bottom">
                    <lk-logo />
                </div>
            </div>
        </transition-fade>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkSocial from "@/components/LkSocial.vue"
import HamburgerIcon from "@/components/HamburgerIcon.vue"
import LkNavLink from "@/components/LkNavLink.vue"
import LkLogo from "@/components/LkLogo.vue"
import TransitionFade from "@/components/transition/TransitionFade.vue"
import LkLogout from "@/components/LkLogout.vue"

@Component({
    components: {
        LkSocial,
        HamburgerIcon,
        LkNavLink,
        LkLogo,
        TransitionFade,
        LkLogout,
    },
})
export default class MobileMenu extends Vue {

    get visibleMobileMenu(): boolean {
        return this.$mainStore.mobile.visibleMobileMenu
    }

    showMenu(state: boolean): void {
        this.$mainStore.mobile.setVisibleMobileMenu(state)
    }

    get isAdmin(): boolean {
        return this.$mainStore.user.isAdmin
    }
}
</script>

<style lang="scss">
    .mobile-menu {
        position: fixed;
        top: 0;
        z-index: 100;
        width: calc(100% - 40px);
        height: 40px;
        padding: 20px;
        background: $color-black;
        transition: height .5s;
        &--active {
            height: 100vh;
        }
        &__top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 60px;
        }
        &__center {
            margin-bottom: 20px;
        }
        &__bottom {
            .logo {
                margin: 40px auto;
            }
        }
        &__logout {
            border-top: 1px solid white;
            padding-top: 20px;
            padding-left: 25px;
            .logout__icon {
                path {
                    fill: white;
                }
            }
        }
    }
</style>