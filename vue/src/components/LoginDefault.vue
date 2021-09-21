<template>
    <transition-to-top>
        <div
            class="login-action"
        >
            <router-link :to="$mainPaths.Reg">
                <button>
                    Регистрация
                </button>
            </router-link>
            <router-link :to="$mainPaths.Auth">
                <button>
                    Авторизация
                </button>
            </router-link>
        </div>
    </transition-to-top>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import TransitionToTop from "@/components/TransitionToTop.vue"
@Component({
    components: {
        TransitionToTop,
    },
})
export default class LoginDefault extends Vue {}
</script>

<style lang="scss">

</style>