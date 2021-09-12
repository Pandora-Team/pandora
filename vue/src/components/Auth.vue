<template>
    <div class="auth">
        <h1>Авторизация</h1>
        <form class="form">
            <div class="form__item">
                <label for="phone">Введите номер телефона</label>
                <input
                    id="phone"
                    v-model="phone"
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
            <button @click.prevent="prevStep">
                Назад
            </button>
        </form>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { auth } from "@/api/auth"


@Component({})
export default class Auth extends Vue {
    phone = ""
    password = ""
    loading = false

    submitForm() : void {
        auth({
            phone:    this.phone,
            password: this.password,
        })
            .then(res => {
                const token = res.data.access_token
                localStorage.setItem("at", token)
                this.$router.push({ name: "lk" })
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => (this.loading = false))
    }

    prevStep() : void {
        this.$emit("prev-step")
    }
}
</script>

<style lang="scss">

</style>