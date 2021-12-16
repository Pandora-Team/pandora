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
        <div class="list-students-row__social">
            <lk-social-item
                v-for="social in socialLink"
                :key="social.id"
                :social="social"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"
import LkSocialItem from "@/components/LkSocialItem.vue"
import { SocialData, UserData } from "@/definitions/interfaces"

@Component({
    components: {
        LkAvatar,
        LkSocialItem,
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

    get socialLink(): SocialData[] {
        const data = []
        let id = 1
        if (this.user.vk) {
            data.push({ id: id, path: this.user.vk, icon: "vk" })
            id++
        }
        if (this.user.instagram) {
            data.push({ id: id, path: this.user.instagram, icon: "inst" })
            id++
        }
        if (this.user.telegram) {
            data.push({ id: id, path: this.user.telegram, icon: "telegram" })
        }
        return data
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
        &__social {
            display: flex;
        }
    }
</style>