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
            <div
                class="login-line"
                :style="positionLeftForLine"
            />
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
            return "left: calc(100% - 50%);"
        }
        return "left: calc(50% - 25%);"
    }

    get positionLeftForLine(): string {
        if(this.auth) {
            return "left: 0%;"
        }
        if(this.reg) {
            return "left: -100%;"
        }
        return "left: -50%;"
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
        background: #111227 url("../assets/bg/bg-login-center.png");
        width: 50%;
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        .logo {
            max-width: 160px;
            max-height: 160px;
            margin: 100px auto 115px;
            img {
                width: 100%;
            }
        }
    }
    &-title {
        margin-bottom: 70px;
        h1 {
            color: #FFFFFF;
            letter-spacing: 0.01em;
            font-weight: 600;
            font-size: 24px;
            line-height: 29px;
        }
    }
    &-subtitle {
        margin-bottom: 40px;
        text-align: center;
        h2 {
            font-weight: 300;
            font-size: 18px;
            line-height: 22px;
            letter-spacing: 0.01em;
            color: white;
        }
    }
    &-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 1;
    }
    &-line {
        transition: 1s;
        position: absolute;
        bottom: 5%;
        width: 1920px;
        height: 226px;
        background: url("../assets/bg/line.png") no-repeat;
        background-size: cover;
        z-index: 0;
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