<template>
    <transition-to-top>
        <div class="reg">
            <div class="reg-title">
                <h3>Регистрация</h3>
            </div>
            <main-form
                submit-text="Зарегистрироваться"
                :cancel-button="false"
                :loading="loading"
                @submit="submitForm"
            >
                <template #top>
                    <main-form-item
                        id="name"
                        v-model="$v.name.$model"
                        label="Имя *"
                        type="text"
                        :error="errorNameInput"
                        placeholder="Имя"
                    />
                    <main-form-item
                        id="surname"
                        v-model="$v.surname.$model"
                        label="Фамилия *"
                        type="text"
                        :error="errorSurnameInput"
                        placeholder="Фамилия"
                    />
                </template>
                <template #center>
                    <main-form-item
                        id="phone"
                        v-model="$v.phone.$model"
                        label="Телефон *"
                        type="text"
                        :error="errorPhoneInput"
                        placeholder="+7-___-___-__-__"
                    />
                    <main-form-item
                        id="birthday"
                        v-model="$v.birthday.$model"
                        label="Дата рождения"
                        type="text"
                        placeholder="дд.мм.гггг"
                    />
                </template>
                <template #bottom>
                    <main-form-item
                        id="password"
                        v-model="$v.password.$model"
                        label="Пароль *"
                        type="password"
                        :error="errorPasswordInput"
                        placeholder="Пароль"
                    />
                    <main-form-item
                        id="repeatPassword"
                        v-model="$v.repeatPassword.$model"
                        label="Подтвердить пароль *"
                        type="password"
                        :error="errorRepeatPasswordInput"
                        placeholder="Пароль"
                    />
                </template>
                <template #privacy>
                    <p class="privacy">
                        Нажимая на кнопку Зарегистрироваться, вы подтверждаете, что согласны с
                        <span @click.prevent="goToPolicy">
                            политикой конфиденциальности
                        </span>
                    </p>
                </template>
                <template #cancel>
                    <p class="redirect">
                        Уже был здесь? Тогда тебе <span @click="goToAuth">сюда</span>
                    </p>
                </template>
            </main-form>
        </div>
    </transition-to-top>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { minLength, required, sameAs } from "vuelidate/lib/validators"
import MainFormItem from "@/components/MainFormItem.vue"
import MainForm from "@/components/MainForm.vue"
import TransitionToTop from "@/components/transition/TransitionToTop.vue"
import paths from "@/router/paths"
import { reg } from "@/api/auth"

@Component({
    components: {
        MainForm,
        MainFormItem,
        TransitionToTop,
    },
    validations: {
        name: {
            required,
        },
        surname: {
            required,
        },
        birthday: {

        },
        phone: {
            required,
            minLength: minLength(16),
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
    surname = ""
    birthday = ""

    loading = false

    get errorNameInput(): string {
        if(this.$v.name.$dirty && !this.$v.name.required) {
            return "Обязательно для заполнения"
        }
        return ""
    }

    get errorSurnameInput(): string {
        if(this.$v.surname.$dirty && !this.$v.surname.required) {
            return "Обязательно для заполнения"
        }
        return ""
    }

    get errorPhoneInput(): string {
        if(this.$v.phone.$dirty && !this.$v.phone.required) {
            return "Обязательно для заполнения"
        }
        if(this.$v.phone.$dirty && !this.$v.phone.minLength) {
            return `В поле должно быть не менее ${this.$v.phone.$params.minLength.min} символов`
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

    async submitForm(): Promise<void> {
        this.$v.$touch()
        if(!this.$v.$invalid) {
            this.loading = true
            try {
                const res = await reg({
                    pass:     this.password,
                    name:     this.name,
                    phone:    this.phone.replaceAll("-", ""),
                    surname:  this.surname,
                    birthday: this.birthday,
                })

                this.$mainStore.notification.changeNotification({ state: true, ...this.$mainNotification.successReg })

                const { _id } = res.data
                await this.$mainStore.user.setUserId(_id)
                this.loading = false
                this.$mainStore.app.setLoading(true)
                await this.$router.push({ path: this.$mainPaths.LkLayout, query: { welcome: "true" } })

            } catch (e) {
                this.$mainStore.notification.changeNotification({ state: true, ...this.$mainNotification.failedReg })
                this.loading = false
                await this.$router.push({ path: this.$mainPaths.LoginLayout })
                throw new Error(`Error Registration - ${e}`)
            }
        }
    }

    goToAuth(): void {
        this.$router.push(paths.AuthenticationView)
    }

    goToPolicy(): void {
        this.$router.push(paths.PolicyView)
    }
}
</script>

<style lang="scss">
    .reg {
        width: 600px;
        padding: 0 2px;
        position: absolute;
        &-title {
            text-align: center;
            margin-bottom: 70px;
            h3 {
                color: white;
            }
        }
        .form {
            padding: 0 2px;
        }
    }
    .privacy {
        text-align: center;
        font-size: 14px;
        max-width: 560px;
        position: relative;
        z-index: 2;
        width: 100%;
        color: white;
        line-height: 1.5;
        margin-bottom: 40px;
        span {
            cursor: pointer;
            transition: .5s;
            text-decoration: underline;
            font-size: 14px;
            color: #AD00FF;
            &:hover {
                outline: none;
                color: $color-hover-text;
            }
        }
    }
    .redirect {
        span {
            transition: .5s;
            &:hover {
                outline: none;
                color: $color-hover-text;
            }
        }
    }

    @media all and (max-width: 1400px) {
        .reg {
            width: 100%;
        }
    }

    @media all and (max-width: 768px) {
        .reg {
            left: 0;
            top: 0;
            padding: 40px 0;
        }
    }
</style>