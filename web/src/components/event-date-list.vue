<template>
    <div class="event-date-list">
        <event-date
            v-for="item in dates"
            :key="item.id"
            :item="item"
            @update-date="updateDate"
            @update-end-date="updateEndTime"
            @remove="removeDate"
        />

        <base-button
            :view="viewButton.First"
            class="add-btn"
            @click="addNewDate"
        >
            {{ "Добавить ещё одну дату" }}
        </base-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import EventDate from "@/components/event-date.vue"
import { DateData } from "@/definitions/interfaces"
import { ViewButton } from "@/components/new/buttons/interfaces"
import BaseButton from "@/components/new/buttons/base-button.vue"
import { DateTime } from "luxon"

@Component({
    components: {
        EventDate,
        BaseButton,
    },
})
export default class EventDateList extends Vue {
    @Prop({ type: Array, required: true })
    readonly dates!: DateData[]


    viewButton = ViewButton


    addNewDate(): void {
        const prevDate = this.dates[this.dates.length - 1]

        const newDate = {
            id:   prevDate.id + 1,
            date: DateTime.fromISO(prevDate.date)
                .plus({ week: 1 })
                .toString(),
            end_time: DateTime.fromISO(prevDate.end_time)
                .plus({ week: 1 })
                .toFormat("HH:mm"),
        }

        const newDates = [ ...this.dates, newDate ].sort(item => item.id)
        this.$emit("change", newDates)
    }


    removeDate(id: number): void {
        const newDates = this.dates.filter(item => item.id !== id)
        this.$emit("change", newDates)
    }

    updateDate(obj: DateData, value: string): void {
        const newDates = this.dates.map(item => {
            if (item.id === obj.id) {
                item.date = value
            }
            return item
        })
        this.$emit("change", newDates)
    }

    updateEndTime(obj: DateData, value: string): void {
        const newDates = this.dates.map(item => {
            if (item.id === obj.id) {
                item.end_time = value
            }
            return item
        })
        this.$emit("change", newDates)
    }
}
</script>

<style lang="scss" scoped>
.event-date-list {
    ::v-deep .add-btn {
        margin-bottom: 20px;
        max-width: 350px;
    }
}
</style>