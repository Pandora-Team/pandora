<template>
    <div class="auth">
        <h1>Авторизация</h1>
        <form class="form">
            <div class="form__item">
                <label for="phone">Введите номер телефона</label>
                <input
                    id="phone"
                    v-model.trim="$v.phone.$model"
                    type="text"
                >
                <div
                    class="form-error"
                    v-if="!$v.phone.required"
                >
                    Поле обязательно для заполнения
                </div>
                <div
                    class="form-error"
                    v-if="$v.phone.$invalid"
                >
                    Поле заполнено неверно
                </div>
            </div>
            <div class="form__item">
                <label for="password">Введите пароль</label>
                <input
                    id="password"
                    v-model.trim="$v.password.$model"
                    type="password"
                >
                <div
                    class="form-error"
                    v-if="!$v.password.required"
                >
                    Поле обязательно для заполнения
                </div>
                <div
                    class="form-error"
                    v-if="!$v.password.minLength"
                >
                    Пароль должен состоять минимум из {{ $v.password.$params.minLength.min }} символов
                </div>
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
import { required, minLength, maxLength } from "vuelidate/lib/validators"


@Component({
    validations: {
        phone: {
            required,
            minLength: minLength(11),
            maxLength: maxLength(11),
        },
        password: {
            required,
            minLength: minLength(6),
        },
    },
})
export default class Auth extends Vue {
    phone = ""
    password = ""
    loading = false

    submitForm() : void {
        if (this.$v.$invalid) {
            console.error("Forms invalid")
            return
        }
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