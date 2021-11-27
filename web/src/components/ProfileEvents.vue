<template>
    <div class="profile-events">
        <h3>Посещённые классы</h3>
        <div
            v-for="item in eventsData"
            :key="item.id"
            class="profile-events__item"
        >
            <h4>{{ item.name }}</h4>
            <h4>Дата: <span>{{ item.date }}</span></h4>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"
import LkSocialItem from "@/components/LkSocialItem.vue"

@Component({
    components: {
        LkAvatar,
        LkSocialItem,
    },
})
export default class ProfileEvents extends Vue {

    eventsData = [
        { id: 1, name: "Lisa -Lalisa", date: "05.09.21" },
        { id: 2, name: "Stray Kids - Thunderous", date: "05.09.21" },
        { id: 3, name: "Ateez - Deja Vu", date: "05.09.21" },
    ]

}
</script>

<style lang="scss">
    .profile {
        &-events {
            background: $bg-info;
            border-radius: 30px;
            padding: 30px 40px;
            color: $color-black;
            h3 {
                margin-bottom: 40px;
                color: $color-dark;
            }
            &__item {
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                color: inherit;
                &:nth-last-of-type(1) {
                    margin-bottom: 0;
                }
                span {
                    font-size: $font-size-big-text;
                }
            }
        }
    }
</style>