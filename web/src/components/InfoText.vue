<template>
    <div class="info-text">
        <h4>{{ data.title }}</h4>
        <template v-if="data.textFirst.length">
            <p
                v-for="item in data.textFirst"
                :key="item"
            >
                {{ item }}
            </p>
        </template>
        <div
            v-if="data.list.length"
            class="info-text__list"
        >
            <info-list
                :active="true"
                :text="data.list"
            />
        </div>
        <template v-if="data.textSecond.length">
            <p
                v-for="item in data.textSecond"
                :key="item"
            >
                {{ item }}
            </p>
        </template>
    </div>
</template>

<script lang="ts">

interface InfoTextData {
    title: string
    textFirst: string[]
    textSecond: string[]
    list: string[]
}

import { Component, Vue, Prop } from "vue-property-decorator"
import InfoList from "@/components/InfoList.vue"

@Component({
    components: {
        InfoList,
    },
})
export default class InfoText extends Vue {

    @Prop({ type: Object })
    readonly data!: InfoTextData

}
</script>

<style lang="scss">
    .info-text {
        color: $color-black;
        margin-bottom: 30px;
        &:nth-last-of-type(1) {
            margin-bottom: 0;
        }
        &__list {
            margin-bottom: 15px;
        }
        h4 {
            color: inherit;
            margin-bottom: 15px;
        }
        p {
            color: inherit;
            margin-bottom: 15px;
        }
    }
</style>