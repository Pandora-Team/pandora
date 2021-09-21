<template>
    <transition-to-top>
        <div
            class="login-action"
        >
            <main-btn
                type="link"
                :url="$mainPaths.Reg"
            >
                Регистрация
            </main-btn>
            <main-btn
                type="link"
                :url="$mainPaths.Auth"
            >
                Авторизация
            </main-btn>
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