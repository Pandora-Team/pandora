<template>
    <div class="header">
        <div class="header-wrapper">
            <lk-avatar />
            <p class="header__name">
                {{ name }}
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

import { Component, Vue, Watch } from "vue-property-decorator"
import LkAvatar from "@/components/LkAvatar.vue"

@Component({
    components: {
        LkAvatar,
    },
})
export default class LkHeader extends Vue {

    name = ""

    get iconPath(): string {
        return require("@/assets/svg/logout.svg")
    }

    @Watch("$mainStore.user.name", { immediate: true })
    updateName(): void {
        const fullName = this.$mainStore.user.name
        const arrName:string[] = fullName.split(" ")
        const secondName = arrName[0]
        const firstName = arrName[1]
        if (firstName) {
            const firstNameArr = firstName.split("")
            const firstLetter = firstNameArr[0]
            this.name = `${secondName} ${firstLetter}.`
        } else {
            this.name = fullName
        }
    }

    async logout(): Promise<void> {
        await localStorage.removeItem("at")
        await this.$mainStore.user.clearUserInfo()
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