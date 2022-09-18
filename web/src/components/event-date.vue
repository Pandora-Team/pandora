<template>
    <div class="event-date">
        <date-picker
            :value="item.date"
            mode="dateTime"
            :minute-increment="5"
            is-dark
            is24hr
            is-purple
            :min-date="minDate"
            @input="updateDate"
        >
            <template v-slot="{ inputValue, inputEvents }">
                <label for="datepicker">Дата и время проведения МК *</label>
                <input
                    id="datepicker"
                    class="datepicker-input"
                    :value="inputValue"
                    v-on="inputEvents"
                >
            </template>
        </date-picker>

        <base-input
            id="end_time"
            :value="item.end_time"
            label="Время окончания занятия *"
            placeholder="Введите время окончания занятия"
            @input="updateEndTime"
        />

        <div
            v-if="item.id !== 1"
            class="event-date-remove"
            @click="$emit('remove', item.id)"
        >
            <simple-svg
                :src="iconPath"
                width="29px"
                height="29px"
                custom-class-name="profile-card__edit"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"
import BaseInput from "@/components/new/inputs/base-input.vue"
import { DateTime } from "luxon"
import { DateData } from "@/definitions/interfaces"

@Component({
    components: {
        BaseInput,
    },
})
export default class EventDateNew extends Vue {
    @Prop({ type: Object, required: true })
    readonly item!: DateData


    minDate = ""


    get iconPath(): string {
        return require("@/assets/svg/close-red.svg")
    }


    mounted(): void {
        this.minDate = DateTime.now().toString()
    }
    
    updateEndTime(value: string): void {
        this.$emit("update-end-date", this.item, value)
    }
    
    updateDate(value: string): void {
        this.$emit("update-date", this.item, value)
    }
}
</script>

<style lang="scss" scoped>
    .event-date {
        display: flex;
        flex-direction: column;
        padding: 20px;
        border: 1px solid #242424;
        border-radius: 16px;
        max-width: 350px;
        margin-bottom: 20px;
        position: relative;
        box-sizing: border-box;

        .datepicker-input {
            max-width: 350px;
            padding: 16px 20px;
            color: #242424;
            border-radius: 16px;
            border: 1px solid #242424;
            background: rgba(255, 255, 255, 0.4);
            transition: .5s;
            height: 52px;
            box-sizing: border-box;
            font-size: 14px;
            margin-bottom: 20px;
        }

        .event-date-remove {
            position: absolute;
            top: 20px;
            right: 20px;
        }
    }
</style>