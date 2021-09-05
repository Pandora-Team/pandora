<template>
    <div class="reg">
        <h1>Регистрация</h1>
        <form class="form">
            <div class="form__item">
                <label for="username">Введите эмейл</label>
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
            <div class="form__item">
                <label for="name">Введите фамилию и имя</label>
                <input
                    id="name"
                    v-model="name"
                    type="text"
                >
            </div>
            <div class="form__item">
                <label for="phone">Введите телефон</label>
                <input
                    id="phone"
                    v-model="phone"
                    type="text"
                >
            </div>
            <div class="form__item">
                <label for="birthday">Введите дату рождения</label>
                <input
                    id="birthday"
                    v-model="birthday"
                    type="text"
                >
            </div>
            <button @click.prevent="submitForm">
                Зарегистрироваться
            </button>
        </form>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import axios from "axios"

@Component({})
export default class Reg extends Vue {

    username = ""
    password = ""
    name = ""
    phone = ""
    birthday = ""
    loading = false

    submitForm() {
        axios
            .post("http://localhost:5000/users/create", {
                username: this.username,
                password: this.password,
                name:     this.name,
                phone:    this.phone,
                birthday: this.birthday,
            })
            .then(res => {
                console.log(res)
                this.$router.push({ name: "auth" })
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => (this.loading = false))
    }
}
</script>

<style lang="scss">

</style>