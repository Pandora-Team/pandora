<template>
    <div
        class="form__item address-popup"
        @click="changePopupAddress"
    >
        <label>Выбрать прежний адрес *</label>
        <main-input
            id="selectAddress"
            :value="oldAddress.address"
            :disabled="true"
            type="text"
        />
        <div
            v-if="visiblePopupAddress"
            class="address-popup__body"
        >
            <div
                class="address-popup__item"
                data-id="1"
                @click="checkOldAddress"
            >
                Tula example
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"
import MainInput from "@/components/MainInput.vue"

@Component({
    components: {
        MainInput,
    },
})
export default class EventSelectAddress extends Vue {

    oldAddress = {
        id:      "",
        address: "",
    }
    visiblePopupAddress = false

    @Watch("oldAddress", { deep: true, immediate: true })
    updatePlaceId(): void {
        const place_id = this.oldAddress.id
        this.$mainStore.events.changePlaceId(place_id)
    }

    changePopupAddress(): void {
        this.visiblePopupAddress = !this.visiblePopupAddress
    }

    checkOldAddress(e: Event): void {
        const target: EventTarget = e.target
        const id = target?.getAttribute("data-id")
        const address = target?.textContent
        this.oldAddress = { id, address }
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
        max-height: 174px;
        overflow: auto;
    }
    &__item {
        cursor: pointer;
        padding: 20px;
        transition: .5s;
        border-radius: 15px;
        &:hover {
            background: wheat;
        }
    }
}
</style>