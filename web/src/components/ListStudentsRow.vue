<template>
    <div class="list-students-row">
        <div class="list-students-row__item">
            <div class="list-students-row__number">
                {{ number }}
            </div>
            <div class="list-students-row__avatar">
                <lk-avatar />
            </div>
            <div class="list-students-row__name">
                {{ `${user.name} ${user.surname}` }}
            </div>
        </div>
        <div class="list-students-row__birthday">
            Дата рождения: <b>{{ user.birthday }}</b>
        </div>
        <div class="list-students-row__phone">
            Телефон: <b>{{ user.phone }}</b>
        </div>
        <!--<div class="list-students-row__social">

        </div>-->
    </div>
</template>

<script lang="ts">

interface UserData {
    name: string
    phone: string
    birthday: string
    avatar?: string
    surname: string
}

import { Component, Prop, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"

@Component({
    components: {
        LkAvatar,
    },
})
export default class ListStudentsRow extends Vue {

    @Prop({ type: Object })
    readonly user!: UserData

    @Prop({ type: Number })
    readonly index!: number

    get number(): number {
        return this.index + 1
    }
}
</script>

<style lang="scss">
    .list-students-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 30px;
        background: $color-white;
        border-radius: 30px;
        &__item {
            display: flex;
            align-items: center;
        }
        &__number {
            margin-right: 40px;
        }
        &__avatar {
            margin-right: 20px;
        }
    }
</style>