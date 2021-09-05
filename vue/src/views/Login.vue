<template>
    <div class="login">
        <div class="login-action">
            <router-link :to="{ name: 'reg' }">
                <button>Регистрация</button>
            </router-link>
            <router-link :to="{ name: 'auth' }">
                <button>Вход</button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class Login extends Vue {

}
</script>

<style lang="scss">

</style>