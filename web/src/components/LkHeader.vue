<template>
    <div class="header">
        <div class="header-wrapper">
            <lk-avatar />
            <p class="header__name">
                {{ fullName }}
            </p>
            <div @click="logout">
                <simple-svg
                    :src="iconPath"
                    width="32px"
                    height="32px"
                    custom-class-name="header__logout"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"
import paths from "@/router/paths"

@Component({
    components: {
        LkAvatar,
    },
})
export default class LkHeader extends Vue {

    get iconPath(): string {
        return require("@/assets/svg/logout.svg")
    }

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

    logout(): void {
        this.$mainStore.user.logout()
        this.$router.push({ path: paths.LoginLayout })
    }


}
</script>

<style lang="scss">
    .header {
        padding: 15px 44px;
        border-bottom: 1px solid rgba(151, 146, 153, 0.4);
        min-height: 50px;
        &-wrapper {
            display: flex;
            justify-content: right;
            align-items: center;
        }
        &__avatar {
            max-width: 50px;
        }
        &__name {
            margin: 0 40px 0 16px;
            color: $color-black;
        }
        &__logout {
            transition: .5s;
            cursor: pointer;
            opacity: 0.5;
            path {
              transition: .5s;
            }
            &:hover {
              opacity: 1;
              path {
                fill: $color-purple;
              }
            }
        }
    }
</style>