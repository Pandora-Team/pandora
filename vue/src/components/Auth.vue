<template>
    <div class="auth">
        <h1>Авторизация</h1>
        <form
            class="form"
            novalidate
        >
            <div class="form__item">
                <label for="phone">Телефон*</label>
                <input
                    id="phone"
                    v-model.trim="$v.phone.$model"
                    type="text"
                    autocomplete="off"
                >
                <div
                    v-if="$v.phone.$dirty && !$v.phone.required"
                    class="form-error"
                >
                    Обязательно для заполнения
                </div>
                <div
                    v-if="$v.phone.$dirty && !$v.phone.minLength"
                    class="form-error"
                >
                    В поле должно быть не менее {{ $v.phone.$params.minLength.min }} символов
                </div>
                <div
                    v-if="$v.phone.$dirty && !$v.phone.maxLength"
                    class="form-error"
                >
                    В поле должно быть не более {{ $v.phone.$params.maxLength.max }} символов
                </div>
                <div
                    v-if="$v.phone.$dirty && !$v.phone.numeric"
                    class="form-error"
                >
                    В поле должны быть только цифры
                </div>
            </div>
            <div class="form__item">
                <label for="password">Пароль*</label>
                <input
                    id="password"
                    v-model.trim="$v.password.$model"
                    type="password"
                    autocomplete="off"
                >
                <div
                    v-if="$v.password.$dirty && !$v.password.required"
                    class="form-error"
                >
                    Обязательно для заполнения
                </div>
                <div
                    v-if="$v.password.$dirty && !$v.password.minLength"
                    class="form-error"
                >
                    В поле должно быть {{ $v.password.$params.minLength.min }} символов.
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
import { required, minLength, maxLength, numeric } from "vuelidate/lib/validators"


@Component({
    validations: {
        phone: {
            required,
            numeric,
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
        if (!this.$v.$invalid) {
            auth({
                phone:    this.phone,
                pass: this.password,
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
    }

    prevStep() : void {
        this.$emit("prev-step")
    }
}
</script>

<style lang="scss">

</style>