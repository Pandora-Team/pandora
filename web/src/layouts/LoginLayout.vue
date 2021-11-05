<template>
    <div class="login">
        <div
            class="login-body"
            :style="positionLeft"
        >
            <div class="login-content">
                <router-view />
            </div>
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
        transition: .5s;
        background: #111227 url("../assets/bg/bg-login-center.png");
        width: calc(50% - 80px);
        position: relative;
        overflow: hidden;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 40px;
    }
    &-content {
        transition: 1s;
        overflow: hidden;
    }
    &-line {
        transition: .5s;
        position: absolute;
        bottom: 2%;
        width: 1920px;
        height: 242px;
        background: url("../assets/bg/line.png") no-repeat;
        background-size: cover;
        z-index: 0;
    }
}
</style>