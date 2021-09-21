<template>
    <div class="auth">
        <h1>Авторизация</h1>
        <base-form
            :error="errorForm"
            submit-text="Войти"
            cancel-text="Назад"
            @submit="submitForm"
            @cancel="prevStep"
        >
            <base-form-item
                id="phone"
                v-model="$v.phone.$model"
                label="Телефон*"
                type="text"
                :error="errorPhoneInput"
            />
            <base-form-item
                id="password"
                v-model="$v.password.$model"
                label="Пароль*"
                type="password"
                :error="errorPasswordInput"
            />
        </base-form>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { auth } from "@/api/auth"
import { required, minLength, maxLength, numeric } from "vuelidate/lib/validators"
import BaseFormItem from "@/components/BaseFormItem.vue"
import BaseForm from "@/components/BaseForm.vue"


@Component({
    components: {
        BaseForm,
        BaseFormItem,
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
export default class Auth extends Vue {
    phone = ""
    password = ""
    loading = false

    submitForm() : void {
        if (!this.$v.$invalid) {
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

    get errorForm():string {
        if(this.$v.$anyError) {
            return "Форма содержит ошибки"
        }
        return ""
    }

    prevStep() : void {
        this.$emit("prev-step")
    }
}
</script>

<style lang="scss">

</style>