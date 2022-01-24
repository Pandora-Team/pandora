<template>
    <div>
        <transition
            appear
            mode="out-in"
            name="logo-trans"
        >
            <div
                class="logo"
            >
                <simple-svg
                    :src="iconPath"
                    width="124px"
                    height="127px"
                    custom-class-name="login-logo"
                />
            </div>
        </transition>
        <transition-fade>
            <div
                class="login-block"
            >
                <div class="login-title">
                    <h3>Привет и добро пожаловать в&nbsp;PANDORA!</h3>
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
                        :gradient="true"
                        view="without-bg"
                        type="link"
                        :url="$mainPaths.RegistrationView"
                    >
                        Регистрация
                    </main-btn>
                </div>
            </div>
        </transition-fade>
    </div>
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
export default class LoginView extends Vue {

    get iconPath(): string {
        return require("@a/svg/logo.svg")
    }

}
</script>

<style lang="scss">
    .logo {
        max-width: 124px;
        max-height: 127px;
        margin: 100px auto 115px;
        @media all and (max-width: 500px) {
            margin: 60px auto 70px;
        }
    }
    .login-block {
        width: 100%;
    }
    .login-title {
        max-width: 390px;
        margin: 0 auto 115px;
        text-align: center;
        @media all and (max-width: 500px) {
            margin: 0 auto 80px;
        }
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
            font-weight: 300;
        }
    }
    .login-action {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1;
        .btn--without-bg {
            min-width: 260px;
        }
    }

    .logo-trans {
        &-enter-active,
        &-leave-active {
            transition: all .5s;
        }
        &-enter,
        &-leave-to {
            opacity: 0;
            transform: translateY(-100px);
        }
    }

    @media all and (max-width: 768px) {
        .login {
            &-action {
                flex-wrap: wrap;

                .btn-wrapper {
                    width: 100%;
                    margin: 0;
                    display: flex;
                    justify-content: center;

                    &--gradient:before {
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    + .btn-wrapper {
                        margin-top: 30px;
                    }
                }
            }
        }
    }
</style>