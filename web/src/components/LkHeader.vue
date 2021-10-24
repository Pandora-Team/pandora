<template>
    <div class="header">
        <div class="header-wrapper">
            <img
                class="header__avatar"
                src="@/assets/bg/avatar.png"
                alt="avatar"
            >
            <p class="header__name">
                {{ name }}
            </p>
            <img
                class="header__logout"
                src="@/assets/svg/logout.svg"
                alt="logout"
                @click="logout"
            >
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"

@Component({})
export default class LkHeader extends Vue {

    name = ""

    @Watch("$mainStore.user.name", { immediate: true })
    updateName(): void {
        this.name = this.$mainStore.user.name
    }

    logout(): void {
        return
    }
}
</script>

<style lang="scss">
    .header {
        padding: 20px 34px;
        border-bottom: 1px solid #d5d3d6;
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
            margin: 0 40px 0 24px;
            color: #242424;
            font-size: 16px;
            line-height: 20px;
        }
        &__logout {
            opacity: 0.6;
            cursor: pointer;
        }
    }
</style>