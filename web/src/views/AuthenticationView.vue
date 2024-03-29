<template>
    <transition-to-top>
        <div class="auth">
            <div class="auth-title">
                <h3>Авторизация</h3>
            </div>
            <main-form
                submit-text="Войти"
                :cancel-button="false"
                :loading="loading"
                @submit="submitForm"
            >
                <template #top>
                    <main-form-item
                        id="phone"
                        v-model="$v.phone.$model"
                        label="Телефон *"
                        type="text"
                        :error="errorPhoneInput"
                        placeholder="+7-___-___-__-__"
                    />
                    <main-form-item
                        id="password"
                        v-model="$v.password.$model"
                        label="Пароль *"
                        type="password"
                        :error="errorPasswordInput"
                        placeholder="Пароль"
                    />
                </template>
                <template #cancel>
                    <p class="redirect">
                        Забыл зарегистрироваться? Тебе <span @click="goToReg">сюда</span>
                    </p>
                </template>
            </main-form>
        </div>
    </transition-to-top>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { auth } from "@/api/auth"
import { required, minLength } from "vuelidate/lib/validators"
import MainFormItem from "@/components/MainFormItem.vue"
import MainForm from "@/components/MainForm.vue"
import paths from "@/router/paths"
import TransitionToTop from "@/components/transition/TransitionToTop.vue"


@Component({
    components: {
        MainForm,
        MainFormItem,
        TransitionToTop,
    },
    validations: {
        phone: {
            required,
            minLength: minLength(16),
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

    async submitForm() : Promise<void> {
        this.$v.$touch()
        if (!this.$v.$invalid) {
            this.loading = true
            try {
                const { data } = await auth({
                    phone: this.phone
                        .replace("-", "")
                        .replace("-", "")
                        .replace("-", "")
                        .replace("-", ""),
                    pass: this.password,
                })

                this.$mainStore.notification.changeNotification({ state: true, ...this.$mainNotification.successAuth })
                this.loading = false
                this.$mainStore.user.setUserId(data)
                this.$mainStore.app.setLoading(true)
                await this.$router.push({ path: this.$mainPaths.LkLayout })
            } catch (e) {
                this.$mainStore.notification.changeNotification({ state: true, ...this.$mainNotification.failedAuth })
                this.loading = false
                await this.$router.push({ path: this.$mainPaths.LoginLayout })
                throw new Error(`Error Authentication - ${e}`)
            }
        }
    }

    goToReg(): void {
        this.$router.push(paths.RegistrationView)
    }
}
</script>

<style lang="scss">
    .auth {
        width: 600px;
        padding: 0 2px;
        position: absolute;
        &-title {
            text-align: center;
            margin: 0 auto 70px;
            h3 {
                color: white;
            }
        }
        .form {
            padding: 0 2px;
        }
    }

    @media all and (max-width: 1400px) {
        .auth {
            width: 100%;
        }
    }

    @media all and (max-width: 768px) {
        .auth {
            padding: 40px 0;
            left: 0;
            top: 0;
            height: calc(100% - 80px);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
</style>