<template>
    <transition-from-right>
        <div class="reg">
            <div class="login-title">
                <h1>Регистрация</h1>
            </div>
            <main-form
                submit-text="Зарегистрироваться"
                cancel-text="Назад"
                @submit="submitForm"
                @cancel="goToLogin"
            >
                <template #top>
                    <main-form-item
                        id="name"
                        v-model="$v.name.$model"
                        label="Имя и фамилия*"
                        type="text"
                        :error="errorNameInput"
                    />
                    <main-form-item
                        id="phone"
                        v-model="$v.phone.$model"
                        label="Телефон*"
                        type="text"
                        :error="errorPhoneInput"
                    />
                </template>
                <template #center>
                    <main-form-item
                        id="password"
                        v-model="$v.password.$model"
                        label="Пароль*"
                        type="password"
                        :error="errorPasswordInput"
                    />
                    <main-form-item
                        id="repeatPassword"
                        v-model="$v.repeatPassword.$model"
                        label="Подтвердить пароль*"
                        type="password"
                        :error="errorRepeatPasswordInput"
                    />
                </template>
            </main-form>
            <p class="privacy">
                Нажимая на кнопку Зарегистрироваться, вы подтверждаете, что согласны с
                <a
                    :href="$mainPaths.PolicyView"
                    target="_blank"
                >
                    Политикой конфиденциальности
                </a>
            </p>
        </div>
    </transition-from-right>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { create } from "@/api/users"
import { maxLength, minLength, required, sameAs, numeric } from "vuelidate/lib/validators"
import MainFormItem from "@/components/MainFormItem.vue"
import MainForm from "@/components/MainForm.vue"
import TransitionFromRight from "@/components/transition/TransitionFromRight.vue"
import paths from "@/router/paths"

@Component({
    components: {
        MainForm,
        MainFormItem,
        TransitionFromRight,
    },
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
export default class RegistrationView extends Vue {

    name = ""
    phone = ""
    password = ""
    repeatPassword = ""
    loading = false

    submitForm(): void {
        if(!this.$v.$invalid) {
            create({
                pass:  this.password,
                name:  this.name,
                phone: this.phone,
            })
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    console.error(error)
                })
                .finally(() => (this.loading = false))
        }
    }

    get errorNameInput(): string {
        if(this.$v.name.$dirty && !this.$v.name.required) {
            return "Обязательно для заполнения"
        }
        return ""
    }

    get errorPhoneInput(): string {
        if(this.$v.phone.$dirty && !this.$v.phone.required) {
            return "Обязательно для заполнения"
        }
        if(this.$v.phone.$dirty && !this.$v.phone.numeric) {
            return "В поле должны быть только цифры"
        }
        if(this.$v.phone.$dirty && !this.$v.phone.minLength) {
            return `В поле должно быть не менее ${this.$v.phone.$params.minLength.min} символов`
        }
        if(this.$v.phone.$dirty && !this.$v.phone.maxLength) {
            return `В поле должно быть не более ${this.$v.phone.$params.maxLength.max} символов`
        }
        return ""
    }

    get errorPasswordInput(): string {
        if(this.$v.password.$dirty && !this.$v.password.required) {
            return "Обязательно для заполнения"
        }
        if(this.$v.password.$dirty && !this.$v.password.minLength) {
            return `В поле должно быть ${this.$v.password.$params.minLength.min} символов`
        }
        return ""
    }

    get errorRepeatPasswordInput(): string {
        if(this.$v.repeatPassword.$dirty && !this.$v.repeatPassword.required) {
            return "Обязательно для заполнения"
        }
        if(this.$v.repeatPassword.$dirty && !this.$v.repeatPassword.sameAsPassword) {
            return "Пароли не совпадают"
        }
        return ""
    }

    goToLogin(): void {
        this.$router.push(paths.LoginLayout)
    }
}
</script>

<style lang="scss">
    .privacy {
        max-width: 560px;
        position: relative;
        z-index: 2;
        width: 100%;
        color: white;
        line-height: 1.5;
        a {
            color: white;
        }
    }
</style>