<template>
    <div class="reg">
        <h1>Регистрация</h1>
        <div
            v-if="$v.$anyError"
            class="form-error form-error--title"
        >
            Форма содержит ошибки
        </div>
        <form
            class="form"
            novalidate
        >
            <div class="form__item">
                <label for="name">Имя и фамилия*</label>
                <input
                    id="name"
                    v-model="$v.name.$model"
                    type="text"
                    autocomplete="off"
                >
                <div
                    v-if="$v.name.$dirty && !$v.name.required"
                    class="form-error"
                >
                    Обязательно для заполнения
                </div>
            </div>
            <div class="form__item">
                <label for="phone">Телефон*</label>
                <input
                    id="phone"
                    v-model="$v.phone.$model"
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
                    v-model="$v.password.$model"
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
            <div class="form__item">
                <label for="repeatPassword">Подтвердить пароль*</label>
                <input
                    id="repeatPassword"
                    v-model="$v.repeatPassword.$model"
                    type="password"
                    autocomplete="off"
                >
                <div
                    v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.required"
                    class="form-error"
                >
                    Обязательно для заполнения
                </div>
                <div
                    v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.sameAsPassword"
                    class="form-error"
                >
                    Пароли не совпадают
                </div>
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
import { create } from "@/api/users"
import { maxLength, minLength, required, sameAs, numeric } from "vuelidate/lib/validators"

@Component({
    validations: {
        name: {
            required,
        },
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
        repeatPassword: {
            required,
            sameAsPassword: sameAs("password"),
        },
    },
})
export default class Reg extends Vue {

    name = ""
    phone = ""
    password = ""
    repeatPassword = ""
    loading = false

    submitForm() : void {
        if(!this.$v.$invalid) {
            create({
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
    }

    prevStep() : void {
        this.$emit("prev-step")
    }
}
</script>

<style lang="scss">

</style>