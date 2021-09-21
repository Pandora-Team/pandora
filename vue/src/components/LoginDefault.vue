<template>
    <transition-to-top>
        <div
            class="login-block"
        >
            <div class="login-title">
                <h1>Привет и добро пожаловать в PANDORA!</h1>
            </div>
            <div class="login-subtitle">
                <h2>Выбирай подходящее поле</h2>
            </div>
            <div class="login-action">
                <main-btn
                    type="link"
                    :url="$mainPaths.Auth"
                >
                    Авторизация
                </main-btn>
                <main-btn
                    type="link"
                    :url="$mainPaths.Reg"
                >
                    Регистрация
                </main-btn>
            </div>
        </div>
    </transition-to-top>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import TransitionToTop from "@/components/TransitionToTop.vue"
import MainBtn from "@/components/MainBtn.vue"
@Component({
    components: {
        TransitionToTop,
        MainBtn,
    },
})
export default class LoginDefault extends Vue {}
</script>

<style lang="scss">

</style>