<template>
    <div
        v-click-away="away"
        class="form__item address-popup"
        @click="changePopupAddress"
    >
        <label>Тип занятия *</label>
        <main-input
            id="type"
            :value="type"
            type="text"
            placeholder="Тип занятия"
            :disabled="true"
        />
        <div
            v-if="visiblePopupType && !!types.length"
            class="address-popup__body"
        >
            <div
                v-for="item in types"
                :key="item.id"
                class="address-popup__item"
                @click="updateType(item.value)"
            >
                {{ item.value }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"
import MainInput from "@/components/MainInput.vue"
import { EventTypeEnum } from "@/definitions/interfaces"

@Component({
    components: {
        MainInput,
    },
})
export default class EventSelectType extends Vue {

    @Prop({ type: String, required: true })
    type!: EventTypeEnum

    visiblePopupType = false

    get types(): { id: number, value: EventTypeEnum }[] {
        return [
            {
                id:    1,
                value: EventTypeEnum.MasterClass,
            },
            {
                id:    2,
                value: EventTypeEnum.Project,
            },
        ]
    }

    updateType(value: EventTypeEnum): void {
        this.$emit("update", value)
    }

    changePopupAddress(): void {
        this.visiblePopupType = !this.visiblePopupType
    }


    away(): void {
        if (this.visiblePopupType) this.visiblePopupType = false
    }

}
</script>

<style lang="scss">
.address-popup {
    position: relative;
    &__body {
        position: absolute;
        z-index: 4;
        top: 110%;
        left: 0;
        width: 100%;
        border-radius: 15px;
        background: white;
        max-height: 200px;
        overflow: auto;
    }
    &__item {
        cursor: pointer;
        margin: 20px;
        padding: 10px;
        transition: .5s;
        color: $color-black;
        border-bottom: 2px solid $color-gray;
        &--active {
            border-bottom: 2px solid $color-hover;
        }
    }
}
</style>