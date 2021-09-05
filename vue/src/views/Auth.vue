<template>
    <div class="auth">
        <h1>Авторизация</h1>
        <h2 v-if="error">
            {{ error }}
        </h2>
        <form class="form">
            <div class="form__item">
                <label for="username">Введите имя</label>
                <input
                    id="username"
                    v-model="username"
                    type="text"
                >
            </div>
            <div class="form__item">
                <label for="password">Введите пароль</label>
                <input
                    id="password"
                    v-model="password"
                    type="password"
                >
            </div>
            <button @click.prevent="submitForm">
                Войти
            </button>
        </form>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import axios from "axios"

@Component({})
export default class Auth extends Vue {
    username = ""
    password = ""
    error = ""
    loading = false

    submitForm() {
        axios
            .post("http://localhost:5000/auth", {
                username: this.username,
                password: this.password,
            })
            .then(res => {
                const token = res.data.access_token
                localStorage.setItem("at", token)
                this.$router.push({ name: "lk" })
            })
            .catch(error => {
                console.error(error)
                this.error = "Пользователь не найден"
            })
            .finally(() => (this.loading = false))
    }
}
</script>

<style lang="scss">

</style>