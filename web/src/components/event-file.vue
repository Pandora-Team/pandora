<template>
    <div
        class="form__item"
        @click="openPopupFile"
    >
        <label>Обложка МК *</label>
        <main-input
            id="file"
            :value="nameFile"
            :disabled="true"
            type="text"
            placeholder="Загрузить фото"
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

import { Component, Ref, Prop, Vue } from "vue-property-decorator"
import MainInput from "@/components/MainInput.vue"
import * as eventAPI from "@/api/events"

@Component({
    components: {
        MainInput,
    },
})
export default class EventFile extends Vue {
    @Prop({ type: String, default: "" })
    readonly cover!: string


    @Ref("fileInput")
    readonly fileInput!: HTMLInputElement


    nameFile = ""


    openPopupFile(): void {
        this.fileInput.click()
    }

    async changeFile(): Promise<void> {
        const files = this.fileInput.files
        if (files && files[0]) {

            // Если уже была загружена обложка, то удалить
            if (this.cover) {
                await eventAPI.removeCover(this.cover)
            }

            this.nameFile = files[0]?.name
            const formData = new FormData()
            formData.append("cover", files[0])

            const newCover = await eventAPI.createCover(formData)
            if (newCover.status !== 201) {
                console.error("[changeFile] - Ошибка загрузки файла")
            }
            this.$emit("change", newCover.data)
        }
    }

}
</script>

<style lang="scss">
    .file-input {
        display: none;
    }
</style>