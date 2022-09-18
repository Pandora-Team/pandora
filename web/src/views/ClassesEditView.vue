<template>
    <div class="classes-edit-view">
        <h3>{{ "Редактировать занятие" }}</h3>
        <base-form
            text-submit-btn="Создать"
            :loading="isLoading"
            @submit="onSave"
        >
            <div class="form-content">
                <base-dropdown
                    v-model="type"
                    label="Тип занятия"
                    :items="listType"
                />

                <base-button
                    v-if="main_event"
                    :view="viewButton.First"
                    class="submit-btn"
                    @click="addMoreEvent"
                >
                    {{ "Добавить занятие в проект" }}
                </base-button>

                <base-input
                    id="name"
                    v-model="name"
                    label="Наименование занятия *"
                    placeholder="Введите наименование занятия"
                />

                <base-input
                    id="price"
                    v-model="price"
                    label="Стоимость занятия *"
                    placeholder="Введите стоимость занятия"
                />

                <base-input
                    id="prepayment"
                    v-model="prepayment"
                    label="Предоплата на занятие"
                    placeholder="Введите предоплату на занятие"
                />

                <base-dropdown
                    v-model="place_id"
                    label="Адрес проведения занятия *"
                    :items="listPlace"
                />

                <event-date-list
                    :dates="dates"
                    @change="changeDates"
                />

                <event-file
                    :cover="cover"
                    @change="changeCover"
                />
            </div>
        </base-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import EventFile from "@/components/event-file.vue"
import EventDate from "@/components/event-date.vue"
import { DateData, EventTypeEnum, PlaceData } from "@/definitions/interfaces"
import { updateEvent, getOneEvent } from "@/api/events"
import BaseForm from "@/components/new/forms/base-form.vue"
import BaseDropdown from "@/components/new/dropdown/base-dropdown.vue"
import BaseInput from "@/components/new/inputs/base-input.vue"
import { DropdownData } from "@/components/new/dropdown/dropdown"
import { getAllPlaces } from "@/api/places"
import EventDateList from "@/components/event-date-list.vue"
import { ViewButton } from "@/components/new/buttons/interfaces"
import BaseButton from "@/components/new/buttons/base-button.vue"


@Component({
    components: {
        EventFile,
        EventDate,
        BaseForm,
        BaseDropdown,
        BaseInput,
        EventDateList,
        BaseButton,
    },
})
export default class ClassesEditView extends Vue {
    async mounted(): Promise<void> {
        const id = this.$route.query.id

        if (!id) {
            await this.$router.push({ path: this.$mainPaths.ClassesView })
        }

        this.event_id = id as string

        const res = await getOneEvent(this.event_id)

        if (res.status !== 200) {
            await this.$router.push({ path: this.$mainPaths.ClassesView })
            return
        }

        const { type, name, price, cover, date, end_time, recorded, address, prepayment, main_event } = res.data
        this.type = type
        this.name = name
        this.price = price
        this.cover = cover
        this.dates.push({
            id:       1,
            date:     date,
            end_time: end_time,
        })
        this.recorded = recorded

        if (prepayment) {
            this.prepayment = prepayment
        }

        if (main_event) {
            this.main_event = main_event
        }

        const { data } = await getAllPlaces()

        this.rawPlaces = data
        this.place_id = data.find((item: { address: string, place_id: string }) => item.address === address)._id
    }


    isLoading = false
    viewButton = ViewButton

    type = EventTypeEnum.MasterClass
    prepayment = ""
    name = ""
    price = "500"
    dates: DateData[] = []
    place_id = ""
    cover = ""
    recorded: string[] = []
    event_id = ""
    main_event = ""

    rawPlaces: PlaceData[] = []


    get listType(): DropdownData[] {
        return [
            {
                id:    EventTypeEnum.MasterClass,
                value: EventTypeEnum.MasterClass,
            },
            {
                id:    EventTypeEnum.Project,
                value: EventTypeEnum.Project,
            },
        ]
    }

    get listPlace(): DropdownData[] {
        return this.rawPlaces.map(place => ({
            id:    place._id,
            value: place.address,
        }))
    }


    changeDates(dates: DateData[]): void {
        this.dates = dates
    }

    changeCover(cover: string): void {
        this.cover = cover
    }

    addMoreEvent(): void {
        this.$router.push({ path:  this.$mainPaths.ClassesAddView, query: {
            main_event: this.main_event,
            recorded:   JSON.stringify(this.recorded),
        } })
    }

    async onSave(): Promise<void> {
        this.isLoading = true

        const data = {
            type:       this.type,
            prepayment: this.prepayment ? this.prepayment : undefined,
            name:       this.name,
            price:      this.price,
            dates:      this.dates,
            place_id:   this.place_id,
            cover:      this.cover,
        }

        try {
            const res = await updateEvent(this.event_id, data)

            if (res.status !== 201) {
                this.$mainStore.notification.changeNotification(
                    { state: true, ...this.$mainNotification.failedCreate })
                this.isLoading = false
            }

            this.$mainStore.notification.changeNotification(
                { state: true, ...this.$mainNotification.successCreate })

            await this.$mainStore.events.getListEvents()
            this.isLoading = false
            await this.$router.push({ path: this.$mainPaths.ClassesView })
        } catch (e) {
            this.$mainStore.notification.changeNotification(
                { state: true, ...this.$mainNotification.failedCreate })
            this.isLoading = false
            throw new Error(`Error create Event - ${e}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.classes-edit-view {
    max-width: 350px;
    h3 {
        color: #242424;
        margin-bottom: 20px;
    }

    ::v-deep {
        label {
            color: #242424;
        }

        .label {
            font-size: 14px;
        }

        .address-popup__body {
            border: 1px solid #242424;
        }

        .input-wrapper--file {
            max-width: 260px;
        }
    }

    .form--create {
        margin: 0!important;
    }
}
</style>