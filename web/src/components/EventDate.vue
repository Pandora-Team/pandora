<template>
    <div class="event-date">
        <div class="form__item">
            <date-picker
                :value="date"
                mode="dateTime"
                :minute-increment="5"
                is-dark
                is24hr
                is-purple
                :min-date="new Date()"
                @input="updateDate"
            >
                <template v-slot="{ inputValue, inputEvents }">
                    <label for="datepicker">Дата и время проведения МК *</label>
                    <div class="input-wrapper">
                        <input
                            id="datepicker"
                            class="input input--main datepicker-input"
                            :value="inputValue"
                            v-on="inputEvents"
                        >
                    </div>
                </template>
            </date-picker>
        </div>
        <main-form-item
            id="end_time"
            :value="endTime"
            label="Время окончания МК *"
            type="text"
            @input="updateEndTimeInStore"
        />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
dayjs.extend(weekday)
import MainFormItem from "@/components/MainFormItem.vue"

@Component({
    components: {
        MainFormItem,
    },
})
export default class EventDate extends Vue {

    @Prop({ type: Date })
    readonly date!: Date

    @Prop({ type: String, default: "" })
    readonly endTime!: string

    @Prop({ type: Boolean, default: false })
    readonly update!: boolean

    mounted(): void {
        if (this.update) return
        const needDate = dayjs(this.date)
            .weekday(7)
            .hour(16)
            .minute(30)
            .second(0)
            .toString()
        const newDate = new Date(needDate)
        this.$mainStore.popup.changeDate(newDate)
    }
    
    updateEndTimeInStore(value: string): void {
        this.$mainStore.popup.changeEndTime(value)
    }
    
    updateDate(value: Date): void {
        this.$mainStore.popup.changeDate(value)
    }

    @Watch("date", { deep: true, immediate: true })
    updateEndTime(): void {
        if (!this.date) return
        if (this.update) return
        const selectedTime = dayjs(this.date)
        const needEndTime = selectedTime.add(2, "hour").add(30, "minute")
        const endTime = `${needEndTime.format("HH:mm")}`
        this.$mainStore.popup.changeEndTime(endTime)
    }

}
</script>

<style lang="scss">
    .event-date {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
</style>