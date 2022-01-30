<template>
    <div
        v-click-away="away"
        class="form__item address-popup"
        @click="changePopupAddress"
    >
        <label>Адрес проведения МК *</label>
        <main-input
            id="place"
            :value="address"
            type="text"
            placeholder="ул. Жуковского, д. 27"
            @input="updateAddress"
        />
        <div
            v-if="visiblePopupAddress && !!places.length"
            class="address-popup__body"
        >
            <div
                v-for="place in places"
                :key="place._id"
                class="address-popup__item"
                :class="{'address-popup__item--active': place._id === selectedAddress._id }"
                :data-id="place._id"
                @click="checkOldAddress"
            >
                {{ place.address }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"
import MainInput from "@/components/MainInput.vue"
import { getAllPlaces } from "@/api/places"
import { PlaceData } from "@/definitions/interfaces"

@Component({
    components: {
        MainInput,
    },
})
export default class EventSelectAddress extends Vue {

    @Prop({ type: String, default: "" })
    address!: string

    @Prop({ type: String, default: "" })
    placeId!: string

    selectedAddress!: PlaceData
    visiblePopupAddress = false
    places!: PlaceData[]

    async mounted(): Promise<void> {
        const { data } = await getAllPlaces()
        if (data?.length) {
            this.places = data
            let currentPlace
            if (this.placeId) {
                currentPlace = this.places.find((place: PlaceData) => place._id === this.placeId)
            } else {
                currentPlace = data[0]
            }
            this.selectedAddress = currentPlace
            this.$mainStore.popup.changePlaceId(this.selectedAddress._id)
            this.$mainStore.popup.changeAddress(this.selectedAddress.address)
        }
    }

    updateAddress(value: string): void {
        this.$mainStore.popup.changeAddress(value)
        this.$mainStore.popup.changePlaceId("")
    }

    changePopupAddress(): void {
        this.visiblePopupAddress = !this.visiblePopupAddress
    }

    checkOldAddress(event: { target: HTMLInputElement }): void {
        const target = event.target
        const _id = target?.getAttribute("data-id")
        if (_id) {
            const currentPlace = this.places.find((place: PlaceData) => place._id === _id)
            if (currentPlace) {
                this.selectedAddress = currentPlace
                this.$mainStore.popup.changePlaceId(this.selectedAddress._id)
                this.$mainStore.popup.changeAddress(this.selectedAddress.address)
            }

        }
    }

    away(): void {
        if (this.visiblePopupAddress) this.visiblePopupAddress = false
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