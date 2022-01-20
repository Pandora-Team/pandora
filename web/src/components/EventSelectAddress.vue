<template>
    <div
        class="form__item address-popup"
        @click="changePopupAddress"
    >
        <label>Адрес проведения МК *</label>
        <main-input
            id="place"
            :value="selectedAddress.address"
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

import { Component, Vue } from "vue-property-decorator"
import MainInput from "@/components/MainInput.vue"
import { getAllPlaces } from "@/api/places"

@Component({
    components: {
        MainInput,
    },
})
export default class EventSelectAddress extends Vue {

    selectedAddress = {
        _id:     "",
        address: "",
    }
    visiblePopupAddress = false
    places = []

    async mounted(): Promise<void> {
        const { data } = await getAllPlaces()
        if (data?.length) {
            this.places = data
            this.selectedAddress = data[0]
            this.$mainStore.popup.changePlaceId(data[0]._id)
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
        const address = target?.textContent
        if (_id && address) {
            this.selectedAddress = { _id, address }
            this.$mainStore.popup.changePlaceId(_id)
            this.$mainStore.popup.changeAddress("")
        }
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