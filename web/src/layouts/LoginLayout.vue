<template>
    <div class="login">
        <div
            class="login-body"
            :class="inlineClass"
        >
            <div class="login-content">
                <router-view />
            </div>
            <div
                class="login-line"
                :class="classForLine"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"
import { Route } from "vue-router"
import names from "@/router/names"

@Component({})
export default class LoginLayout extends Vue {

    auth = false
    reg = false

    @Watch("$route", { immediate: true, deep: true })
    onRouteChange(route: Route): void {
        if(route.name === names.LoginView) {
            this.auth = false
            this.reg = false
        }
        if(route.name === names.RegistrationView) {
            this.auth = false
            this.reg = true
        }
        if(route.name === names.AuthenticationView) {
            this.reg = false
            this.auth = true
        }
    }

    get inlineClass(): string {
        if(this.auth) {
            return "login-body--left login-body--center"
        }
        if(this.reg) {
            return "login-body--right login-body--center"
        }
        return ""
    }

    get classForLine(): string {
        if(this.auth) {
            return "login-line--auth"
        }
        if(this.reg) {
            return "login-line--reg"
        }
        return ""
    }
}
</script>

<style lang="scss">

.login {
    background: url("../assets/bg/bg1920-min.jpg") center no-repeat;
    background-size: cover;
    &-body {
        transition: .5s;
        background: #111227 url("../assets/bg/bg-login-center-min.png");
        width: calc(50% - 80px);
        position: relative;
        overflow: hidden;
        height: 100vh;
        display: flex;
        justify-content: center;
        padding: 0 40px;
        left: 25%;
        &--center {
            .login-content {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
        }
        &--left {
            left: 0;
        }
        &--right {
            left: 50%;
        }
    }
    &-content {
        transition: 1s;
        overflow: hidden;
        max-width: 600px;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
    }
    &-line {
        transition: .5s;
        position: absolute;
        bottom: 2%;
        width: 1920px;
        height: 258px;
        background: url("../assets/bg/line-min.png") no-repeat;
        background-size: cover;
        z-index: 0;
        left: -50%;

        &--auth {
            left: 0;
        }

        &--reg {
            left: -100%;
        }
    }
}

@media all and (max-width: 1400px) {
    .login {
        &-body {
            min-width: 562px;
            left: 50%;
            transform: translateX(-50%);

            &--right {
                left: 100%;
                transform: translateX(-100%);
            }

            &--left {
                left: 0;
                transform: translateX(0);
            }
        }
        &-content {
            max-width: 100%;
        }

        &-line {
            &--reg {
                left: -165%;
            }
            &--auth {
                left: -75%;
            }
        }
    }
}

@media all and (max-width: 768px) {
    .login {
        &-body {
            width: calc(100% - 80px);
            min-width: auto;
            overflow-y: auto;
            height: auto;
            min-height: 100vh;
            left: auto;
            transform: none;
        }

        &-content {
            height: auto;
            overflow: visible;
            padding: 40px 0;
        }

        &-line {
            position: fixed;
        }
    }
}

@media all and (max-width: 500px) {
    .login {
        &-body {
            width: calc(100% - 40px);
            padding: 0 20px;
        }
        &-content {
            padding: 0;
        }
        &-line {
            opacity: 0.2;
        }
    }
}
</style>