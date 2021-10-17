<template>
    <transition-fade>
        <div
            class="login-block"
        >
            <div class="login-title">
                <h3>Привет и добро пожаловать в PANDORA!</h3>
            </div>
            <div class="login-subtitle">
                <h6>Выбирай подходящее поле</h6>
            </div>
            <div class="login-action">
                <main-btn
                    type="link"
                    :url="$mainPaths.AuthenticationView"
                >
                    Авторизация
                </main-btn>
                <main-btn
                    type="link"
                    :url="$mainPaths.RegistrationView"
                >
                    Регистрация
                </main-btn>
            </div>
        </div>
    </transition-fade>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import TransitionFade from "@/components/transition/TransitionFade.vue"
import MainBtn from "@/components/MainBtn.vue"
@Component({
    components: {
        MainBtn,
        TransitionFade,
    },
})
export default class LoginView extends Vue {}
</script>

<style lang="scss">
    .login-block {
        width: 100%;
    }
    .login-title {
        max-width: 390px;
        margin: 0 auto 115px;
        text-align: center;
        h3 {
            line-height: 29px;
            color: white;
        }
    }
    .login-subtitle {
        margin: 0 auto 40px;
        text-align: center;
        h6 {
            color: white;
        }
    }
    .login-action {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1;
    }
</style>