<template>
    <div
        class="logout"
        @click="logout"
    >
        <simple-svg
            :src="iconPath"
            width="32px"
            height="32px"
            custom-class-name="logout__icon"
        />
        <div
            v-if="text"
            class="logout__text"
        >
            {{ text }}
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"
import paths from "@/router/paths"

@Component({
    components: {},
})
export default class LkLogout extends Vue {

    @Prop({ type: String, default: "" })
    text!: string

    get iconPath(): string {
        return require("@/assets/svg/logout.svg")
    }

    logout(): void {
        this.$mainStore.user.logout()
        this.$router.push({ path: paths.LoginLayout })
    }


}
</script>

<style lang="scss">
    .logout {
        display: flex;
        align-items: center;
        cursor: pointer;
        &__text {
            margin-left: 20px;
        }
        &__icon {
            width: 35px;
            transition: .5s;
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