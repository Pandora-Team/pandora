<template>
    <div class="header">
        <div class="header-wrapper">
            <div class="header-item">
                <lk-social />
            </div>
            <div class="header-item">
                <lk-avatar />
                <p class="header__name">
                    {{ fullName }}
                </p>
                <lk-logout />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"
import LkSocial from "@/components/LkSocial.vue"
import LkLogout from "@/components/LkLogout.vue"

@Component({
    components: {
        LkAvatar,
        LkSocial,
        LkLogout,
    },
})
export default class LkHeader extends Vue {

    get name(): string {
        return this.$mainStore.user.name
    }

    get surname(): string {
        return this.$mainStore.user.surname
    }

    get fullName(): string {
        if (this.name && this.surname) {
            const firstNameArr = this.name.split("")
            const firstLetter = firstNameArr[0]
            return `${this.surname} ${firstLetter}.`
        } else {
            return ""
        }
    }

}
</script>

<style lang="scss">
    .header {
        padding: 15px 44px;
        box-shadow: 0 4px 10px rgba(94, 42, 195, 0.06);
        min-height: 50px;
        &-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &-item {
            display: flex;
            align-items: center;
        }
        &__avatar {
            max-width: 50px;
        }
        &__name {
            margin: 0 40px 0 16px;
            color: $color-black;
        }
    }

    @media all and (max-width: 1366px) {
        .header {
            padding: 8px 15px;
        }
    }

    @media all and (max-width: 1366px) {
        .header {
            &__name {
                display: none;
            }

            .avatar {
                margin-right: 20px;
            }
        }
    }
</style>