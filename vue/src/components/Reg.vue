<template>
    <div class="reg">
        <h1>Регистрация</h1>
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
            <div class="form__item">
                <label for="name">Введите фамилию и имя</label>
                <input
                    id="name"
                    v-model="name"
                    type="text"
                >
            </div>
            <button @click.prevent="submitForm">
                Зарегистрироваться
            </button>
            <button @click.prevent="prevStep">
                Назад
            </button>
        </form>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import axios from "axios"

@Component({})
export default class Reg extends Vue {

    password = ""
    name = ""
    phone = ""
    loading = false

    submitForm() : void {
        axios
            .post("http://localhost:5000/users/create", {
                password: this.password,
                name:     this.name,
                phone:    this.phone,
            })
            .then(res => {
                console.log(res)
                this.prevStep()
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