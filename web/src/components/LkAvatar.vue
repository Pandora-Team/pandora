<template>
    <div
        class="avatar"
        :class="inlineClass"
    >
        <img
            :src="iconPath"
            alt="avatar"
        >
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})
export default class LkAvatar extends Vue {

    @Prop({ type: String, default: "min" })
    readonly width!: string

    get avatar(): string {
        return this.$mainStore.user.avatar
    }

    get inlineClass(): any {
        return [`avatar--${this.width}`]
    }

    get iconPath(): string {
        if (this.avatar) {
            return `${process.env.VUE_APP_API_URL}users/${this.avatar}`
        }
        return require("@/assets/images/not-avatar.png")
    }
}
</script>

<style lang="scss">
    .avatar {
        &--min {
            img {
                max-width: 50px;
            }
        }
        &--max {
            img {
                max-width: 117px;
            }
        }
        &--full {
            img {
                max-width: 238px;
            }
        }
    }
</style>