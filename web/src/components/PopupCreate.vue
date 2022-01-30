<template>
    <main-popup
        color-icon-close="white"
        @close="closePopup"
    >
        <div class="event-create">
            <div class="event-create-block">
                <h3>{{ titlePopup }}</h3>
                <main-form
                    class-form="create"
                    :submit-text="textBtnSubmit"
                    width-form="560px"
                    :cancel-button="false"
                    :loading="loading"
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
                            :update="isUpdatePopup"
                            :date="stateDate"
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
import { createEvent, updateEvent } from "@/api/events"
import MainPopup from "@/components/MainPopup.vue"
import { EventData } from "@/definitions/interfaces"

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

    loading = false

    get isUpdatePopup(): boolean {
        return this.$mainStore.popup.updatePopup
    }

    get state(): EventData | any {
        return this.$mainStore.popup.createdState
    }
    
    get stateDate(): Date {
        if(typeof (this.$mainStore.popup.createdState.date) === "string") {
            return new Date(this.$mainStore.popup.createdState.date)
        }
        return this.$mainStore.popup.createdState.date
    }

    get textBtnSubmit(): string {
        if (this.isUpdatePopup) {
            return "Обновить МК"
        }
        return "Создать МК"
    }

    get titlePopup(): string {
        if (this.isUpdatePopup) return "Редактировать мероприятие"
        return "Создать мероприятие"
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
        this.loading = true
        const formData = new FormData()
        const data = { ...this.state }
        const nonIncludeKey = ["status", "users_id", "users"]
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key]) {
                if (nonIncludeKey.includes(key)) continue
                formData.append(key, data[key])
            }
        }

        if (!this.isUpdatePopup) {
            try {
                const res = await createEvent(formData)
                this.$mainStore.events.addEventToList(res?.data)
                this.$mainStore.notification.changeNotification(
                    { state: true, ...this.$mainNotification.successCreate })
                this.loading = false
                this.closePopup()
                return
            } catch (e) {
                this.$mainStore.notification.changeNotification(
                    { state: true, ...this.$mainNotification.failedCreate })
                this.loading = false
                throw new Error(`Error create Event - ${e}`)
            }
        }

        try {
            const { data } = await updateEvent(this.state._id, formData)
            const { cover } = data
            const newState = { ...this.state }
            if (cover) {
                newState.cover = cover
            }
            this.$mainStore.events.updateEventIntoList(newState)
            this.loading = false
            this.closePopup()
        } catch (e) {
            this.$mainStore.notification.changeNotification({ state: true, ...this.$mainNotification.error })
            this.loading = false
            throw new Error(`Error update Event - ${e}`)
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
        @media all and (max-width: 500px) {
            height: 600px;
        }
        &-block {
            padding: 60px;
            box-sizing: border-box;
            @media all and (max-width: 500px) {
                padding: 20px;
                overflow-y: scroll;
                height: 580px;
            }
        }
        h3 {
            text-transform: uppercase;
            color: white;
            text-align: center;
            margin-bottom: 40px;
            line-height: 30px;
            @media all and (max-width: 500px) {
                font-size: 20px;
                line-height: 26px;
                padding-right: 30px;
                text-align: left;
            }
        }
    }
</style>