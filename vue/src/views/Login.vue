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
                    key="logo"
                >
                    <img
                        src="@a/svg/logo.svg"
                        alt="Logo"
                    >
                </div>
            </transition>
            <transition
                appear
                mode="out-in"
                name="auth-trans"
                v-if="auth"
            >
                <Auth
                    key="auth"
                    @prev-step="returnBaseView"
                />
            </transition>
            <transition
                appear
                mode="out-in"
                name="reg-trans"
                v-else-if="reg"
            >
                <Reg
                    key="reg"
                    @prev-step="returnBaseView"
                />
            </transition>
            <div
                class="login-action"
                key="default"
                v-else
            >
                <button @click="reg = true">
                    Регистрация
                </button>
                <button @click="auth = true">
                    Авторизация
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import Auth from "@/components/Auth.vue"
import Reg from "@/components/Reg.vue"

@Component({
    components: {
        Auth,
        Reg,
    },
})
export default class Login extends Vue {
    auth = false
    reg = false

    get positionLeft() : string {
        if(this.auth) {
            return "left: 0%;"
        }
        if(this.reg) {
            return "left: calc(100% - 40%);"
        }
        return "left: calc(50% - 20%);"
    }

    returnBaseView() : void {
        if(this.auth) {
            this.auth = false
        }
        if(this.reg) {
            this.reg = false
        }
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
.auth-trans {
    &-enter-active,
    &-leave-active {
        transition: all 1s;
    }
    &-enter,
    &-leave-to {
        opacity: 0;
        transform: translateY(100px);
    }
}

.reg-trans {
    &-enter-active,
    &-leave-active {
        transition: all 1s;
    }
    &-enter,
    &-leave-to {
        opacity: 0;
        transform: translateY(100px);
    }
}

</style>