<template>
    <div class="login">
        <div
            class="login-body"
            :style="positionLeft"
        >
            <transition
                appear
                mode="out-in"
                name="logo-trans"
            >
                <div
                    class="logo"
                >
                    <img
                        src="@a/svg/logo.svg"
                        alt="Logo"
                    >
                </div>
            </transition>
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"
import { Route } from "vue-router"
import names from "@/router/names"

@Component({})
export default class Login extends Vue {

    auth = false
    reg = false

    @Watch("$route", { immediate: true, deep: true })
    onRouteChange(route: Route): void {
        if(route.name === names.LoginDefault) {
            this.auth = false
            this.reg = false
        }
        if(route.name === names.Reg) {
            this.auth = false
            this.reg = true
        }
        if(route.name === names.Auth) {
            this.reg = false
            this.auth = true
        }
    }

    get positionLeft() : string {
        if(this.auth) {
            return "left: 0%;"
        }
        if(this.reg) {
            return "left: calc(100% - 40%);"
        }
        return "left: calc(50% - 20%);"
    }
}
</script>

<style lang="scss">

.login {
    background: url("../assets/bg/bg1920.jpg") center no-repeat;
    background-size: cover;
    &-body {
        overflow: hidden;
        transition: 1s;
        background: white;
        width: 40%;
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        .logo {
            max-width: 160px;
            max-height: 160px;
            margin: 60px;
            img {
                width: 100%;
            }
        }
    }
}
.logo-trans {
    &-enter-active,
    &-leave-active {
        transition: all 1s;
    }
    &-enter,
    &-leave-to {
        opacity: 0;
        transform: translateY(-100px);
    }
}

</style>