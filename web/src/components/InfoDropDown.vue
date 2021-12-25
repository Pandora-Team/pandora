<template>
    <div
        class="info-dropdown"
        :class="{'info-dropdown--active': active}"
        @click="changeActive"
    >
        <p class="info-dropdown__title">
            {{ item.title }}
        </p>
        <info-list
            :text="item.text"
            :active="active"
        />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"
import InfoList from "@/components/InfoList.vue"

interface InfoDropDownData {
    title: string
    text: string[]
}

@Component({
    components: {
        InfoList,
    },
})
export default class InfoDropDown extends Vue {

    @Prop({ type: Object })
    readonly item!: InfoDropDownData

    active = false

    changeActive(): void {
        this.active = !this.active
    }

}
</script>

<style lang="scss">
    .info-dropdown {
        margin-bottom: 15px;
        background: $color-white;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 30px 40px;
        cursor: pointer;
        @media all and (max-width: 500px) {
            padding: 20px 30px;
        }
        &__title {
            margin-bottom: 0;
            color: $color-black;
            font-weight: 700;
            position: relative;
            display: inline-block;
            width: fit-content;
            &::after {
                transition: .5s;
                transform-origin: center;
                content: "";
                position: absolute;
                right: -20px;
                top: 7px;
                border-style: solid;
                border-width: 5.41px 5px 0 5px;
                border-color: $color-black transparent transparent transparent;
            }
            @media all and (max-width: 500px) {
                width: 100%;
            }
        }
        &--active {
            .info-dropdown__title {
                margin-bottom: 15px;
                &::after {
                    transform: rotate(180deg);
                }
            }
        }
    }
</style>