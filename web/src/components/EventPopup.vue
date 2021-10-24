<template>
    <div class="event-popup">
        <div
            v-on-clickaway="closePopup"
            class="event-popup__body"
        >
            <div
                class="event-popup__exit"
                @click="closePopup"
            />
            <h3>Создание занятия</h3>
            <main-form
                submit-text="Создать"
                cancel-text="Отменить"
                width-form="600px"
                @submit="submitForm"
                @cancel="closePopup"
            >
                <template #top>
                    <main-form-item
                        id="name"
                        :value="state.name"
                        label="Наименование *"
                        type="text"
                        @input="updateName"
                    />
                    <main-form-item
                        id="price"
                        :value="state.price"
                        label="Стоимость ( рублей ) *"
                        type="text"
                        @input="updatePrice"
                    />
                    <event-date
                        :date="state.date"
                        :end-time="state.end_time"
                    />
                </template>
                <template #center>
                    <event-select-address
                        :address="state.address"
                        :place-id="state.place_id"
                    />
                    <event-file />
                </template>
            </main-form>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"
import { directive as onClickaway } from "vue-clickaway"
import MainForm from "@/components/MainForm.vue"
import MainFormItem from "@/components/MainFormItem.vue"
import MainBtn from "@/components/MainBtn.vue"
import MainInput from "@/components/MainInput.vue"
import EventFile from "@/components/EventFile.vue"
import EventSelectAddress from "@/components/EventSelectAddress.vue"
import EventDate from "@/components/EventDate.vue"
import { createEvent } from "@/api/events"

@Component({
    directives: {
        onClickaway: onClickaway,
    },
    components: {
        MainForm,
        MainFormItem,
        MainBtn,
        MainInput,
        EventFile,
        EventSelectAddress,
        EventDate,
    },
})
export default class EventPopup extends Vue {

    state: {[index: string]:any} = {}

    @Watch("$mainStore.events.createdState", { deep: true, immediate: true })
    updateState(): void {
        this.state = this.$mainStore.events.createdState
    }

    beforeDestroy(): void {
        this.$mainStore.events.resetCreatedState()
    }

    updateName(value: string): void {
        this.$mainStore.events.changeName(value)
    }

    updatePrice(value: string): void {
        this.$mainStore.events.changePrice(value)
    }

    closePopup(): void {
        this.$mainStore.events.changePopup(false)
        this.$mainStore.app.setDisabled(false)
    }

    async submitForm(): Promise<void> {
        const formData = new FormData()
        const data = this.state
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key]) {
                formData.append(key, data[key])
            }
        }
        const res = await createEvent(formData)
        if (res?.status === 201) {
            this.$mainStore.events.addEventToList(res?.data)
            this.closePopup()
            return
        }
    }

}
</script>

<style lang="scss">
    .event-popup {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;
        &__exit {
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
            width: 23px;
            height: 23px;
            background: url("../assets/images/exit.png") center no-repeat;
            background-size: contain;
            filter: invert(1);
        }
        &__body {
            margin: 40px;
            position: relative;
            max-width: 800px;
            width: 100%;
            height: 80%;
            border-radius: 25px;
            background: black;
            padding: 40px;
            h3 {
                color: white;
                text-align: center;
                margin-bottom: 40px;
            }
        }
    }
</style>