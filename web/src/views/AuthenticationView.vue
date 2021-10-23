<template>
    <transition-fade>
        <div class="auth">
            <div class="auth-title">
                <h3>Авторизация</h3>
            </div>
            <main-form
                submit-text="Войти"
                :cancel-button="false"
                @submit="submitForm"
            >
                <template #top>
                    <main-form-item
                        id="phone"
                        v-model="$v.phone.$model"
                        label="Телефон*"
                        type="text"
                        :error="errorPhoneInput"
                    />
                    <main-form-item
                        id="password"
                        v-model="$v.password.$model"
                        label="Пароль*"
                        type="password"
                        :error="errorPasswordInput"
                    />
                </template>
                <template #cancel>
                    <p>Забыл зарегистрироваться? Тебе <span @click="goToReg">сюда</span></p>
                </template>
            </main-form>
        </div>
    </transition-fade>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { auth } from "@/api/auth"
import { required, minLength, maxLength, numeric } from "vuelidate/lib/validators"
import MainFormItem from "@/components/MainFormItem.vue"
import MainForm from "@/components/MainForm.vue"
import TransitionFade from "@/components/transition/TransitionFade.vue"
import paths from "@/router/paths"


@Component({
    components: {
        MainForm,
        MainFormItem,
        TransitionFade,
    },
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
export default class AuthenticationView extends Vue {
    phone = ""
    password = ""
    loading = false

    submitForm() : void {
        if (!this.$v.$invalid) {
            auth({
                phone: this.phone,
                pass:  this.password,
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

    goToReg(): void {
        this.$router.push(paths.RegistrationView)
    }
}
</script>

<style lang="scss">
    .auth {
        max-width: 600px;
        padding: 0 2px;
        &-title {
            text-align: center;
            margin: 0 auto 70px;
            h3 {
                color: white;
            }
        }
    }
</style>