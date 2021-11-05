<template>
    <main-popup @close="closePopup">
        <div class="event-create">
            <h3>Создать мероприятие</h3>
            <main-form
                class-form="create"
                submit-text="Создать МК"
                width-form="560px"
                :cancel-button="false"
                @submit="submitForm"
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
                        label="Стоимость (руб.) *"
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
export default class PopupCreate extends Vue {

    get state(): any {
        return this.$mainStore.popup.createdState
    }

    updateName(value: string): void {
        this.$mainStore.popup.changeName(value)
    }

    updatePrice(value: string): void {
        this.$mainStore.popup.changePrice(value)
    }

    closePopup(): void {
        this.$mainStore.popup.changeActiveCreatePopup(false)
    }

    async submitForm(): Promise<void> {
        const formData = new FormData()
        const data = this.state
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key]) {
                formData.append(key, data[key])
            }
        }
        try {
            const res = await createEvent(formData)
            this.$mainStore.events.addEventToList(res?.data)
            this.closePopup()
        } catch (e) {
            console.log(e)
        }
    }

}
</script>

<style lang="scss">
    .event-create {
        position: relative;
        max-width: 683px;
        width: 100%;
        height: auto;
        border-radius: 25px;
        background: $bg-input;
        padding: 60px;
        box-sizing: border-box;
        h3 {
            text-transform: uppercase;
            color: white;
            text-align: center;
            margin-bottom: 40px;
        }
    }
</style>