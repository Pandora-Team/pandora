<template>
    <div class="reg">
        <h1>Регистрация</h1>
        <base-form
            :error="errorForm"
            submit-text="Зарегистрироваться"
            cancel-text="Назад"
            @submit="submitForm"
            @cancel="prevStep"
        >
            <base-form-item
                id="name"
                v-model="$v.name.$model"
                label="Имя и фамилия*"
                type="text"
                :error="errorNameInput"
            />
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
            <base-form-item
                id="repeatPassword"
                v-model="$v.repeatPassword.$model"
                label="Подтвердить пароль*"
                type="password"
                :error="errorRepeatPasswordInput"
            />
        </base-form>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { create } from "@/api/users"
import { maxLength, minLength, required, sameAs, numeric } from "vuelidate/lib/validators"
import BaseFormItem from "@/components/BaseFormItem.vue"
import BaseForm from "@/components/BaseForm.vue"

@Component({
    components: {
        BaseForm,
        BaseFormItem,
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
export default class Reg extends Vue {

    name = ""
    phone = ""
    password = ""
    repeatPassword = ""
    loading = false

    submitForm(): void {
        if(!this.$v.$invalid) {
            create({
                pass: this.password,
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

    get errorForm():string {
        if(this.$v.$anyError) {
            return "Форма содержит ошибки"
        }
        return ""
    }

    prevStep(): void {
        this.$emit("prev-step")
    }
}
</script>

<style lang="scss">

</style>