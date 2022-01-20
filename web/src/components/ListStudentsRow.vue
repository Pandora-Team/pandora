<template>
    <div class="list-students-row">
        <div class="list-students-row__item list-students-row__info">
            <div class="list-students-row__number">
                {{ number }}
            </div>
            <div class="list-students-row__avatar">
                <lk-avatar
                    :student="true"
                    :path="user.avatar"
                />
            </div>
            <div class="list-students-row__name">
                {{ `${user.name} ${user.surname}` }}
            </div>
        </div>
        <div class="list-students-row__item list-students-row__phone">
            Телефон: <b>{{ user.phone }}</b>
        </div>
        <div
            class="list-students-row__item list-students-row__birthday"
            v-html="birthdayText"
        />
        <div class="list-students-row__item list-students-row__social">
            <lk-social-item
                v-for="social in socialLink"
                :key="social.id"
                :social="social"
            />
        </div>
        <drop-down-visited-events :list="user.events" />
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"
import LkSocialItem from "@/components/LkSocialItem.vue"
import { SocialData, UserData } from "@/definitions/interfaces"
import DropDownVisitedEvents from "@/components/DropDownVisitedEvents.vue"

@Component({
    components: {
        LkAvatar,
        LkSocialItem,
        DropDownVisitedEvents,
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

    get birthdayText(): string {
        if (this.user.birthday) return `Дата рождения: <b>${this.user.birthday}</b>`
        return `Дата рождения: <b>&#8212;</b>`
    }

    get socialLink(): SocialData[] {
        return [
            {
                id: 1, path: this.user.vk, icon: "vk", active: Boolean(this.user.vk),
            },
            {
                id: 2, path: this.user.instagram, icon: "inst", active: Boolean(this.user.instagram),
            },
            {
                id: 3, path: this.user.telegram, icon: "telegram", active: Boolean(this.user.telegram),
            },
        ]
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
        flex-wrap: wrap;
        margin-bottom: 20px;
        &:nth-last-of-type(1) {
            margin-bottom: 0;
        }
        &__item {
            display: flex;
            align-items: center;
            width: calc(20% - 10px);
            margin-right: 10px;
            b {
                margin-left: 10px;
            }
            @media all and (max-width: 1700px) {
                width: 30%;
            }
            @media all and (max-width: 1100px) {
                width: 40%;
            }
            @media all and (max-width: 800px) {
                width: 100%;
            }
        }
        &__info {
            line-height: 22px;
            @media all and (max-width: 1700px) {
                margin-bottom: 20px;
            }
        }
        &__number {
            margin-right: 20px;
            @media all and (max-width: 500px) {
                margin-right: 20px;
            }
        }
        &__avatar {
            margin-right: 20px;
            @media all and (max-width: 500px) {
                margin-right: 0;
            }
        }
        &__name {
            @media all and (max-width: 500px) {
                line-height: 1.5;
                margin-left: 10px;
                width: 100%;
            }
        }
        &__phone {
            @media all and (max-width: 800px) {
               margin-bottom: 20px;
            }
            @media all and (max-width: 500px) {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                b {
                    margin-left: 0;
                    margin-top: 10px;
                }
            }
        }
        &__birthday {
            line-height: 22px;
            @media all and (max-width: 1400px) {
                margin-bottom: 20px;
            }
            @media all and (max-width: 500px) {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                b {
                    margin-left: 0;
                    margin-top: 10px;
                }
            }
        }
        &__social {
            @media all and (max-width: 800px) {
                margin-bottom: 20px;
            }
        }
    }
</style>