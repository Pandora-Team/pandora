<template>
    <main-popup @close="closePopup">
        <div class="event-create">
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
    </main-popup>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import MainForm from "@/components/MainForm.vue"
import MainFormItem from "@/components/MainFormItem.vue"
import MainBtn from "@/components/MainBtn.vue"
import MainInput from "@/components/MainInput.vue"
import EventFile from "@/components/EventFile.vue"
import EventSelectAddress from "@/components/EventSelectAddress.vue"
import EventDate from "@/components/EventDate.vue"
import { createEvent } from "@/api/events"
import MainPopup from "@/components/MainPopup.vue"

@Component({
    components: {
        MainForm,
        MainFormItem,
        MainBtn,
        MainInput,
        EventFile,
        EventSelectAddress,
        EventDate,
        MainPopup,
    },
})
export default class EventPopupCreate extends Vue {

    get state(): {[index: string]:any} {
        return this.$mainStore.events.createdState
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
        this.$mainStore.events.changeCreatePopup(false)
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
    .event-create {
        position: relative;
        max-width: 800px;
        width: 100%;
        height: 80%;
        border-radius: 25px;
        background: $color-black;
        padding: 40px;
        box-sizing: border-box;
        h3 {
            color: white;
            text-align: center;
            margin-bottom: 40px;
        }
    }
</style>