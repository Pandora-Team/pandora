<template>
    <div
        class="form__item"
        @click="openPopupFile"
    >
        <label>Выбрать обложку *</label>
        <main-input
            id="file"
            :value="nameFile"
            :disabled="true"
            type="text"
        />
        <input
            ref="fileInput"
            class="file-input"
            type="file"
            @change="changeFile"
        >
    </div>
</template>

<script lang="ts">

import { Component, Ref, Vue } from "vue-property-decorator"
import MainInput from "@/components/MainInput.vue"

@Component({
    components: {
        MainInput,
    },
})
export default class EventFile extends Vue {

    @Ref("fileInput")
    readonly fileInput!: HTMLInputElement

    nameFile = ""

    openPopupFile(): void {
        this.fileInput.click()
    }

    changeFile(): void {
        const files = this.fileInput.files
        if (files) {
            this.nameFile = files[0]?.name
            this.$mainStore.popup.changeCover(files[0])
        }
    }

}
</script>

<style lang="scss">
    .file-input {
        display: none;
    }
</style>