<template>
    <div
        class="avatar"
        :class="inlineClass"
    >
        <img
            :src="iconPath"
            alt="avatar"
            @error="loadError"
        >
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop, Watch } from "vue-property-decorator"

@Component({})
export default class LkAvatar extends Vue {

    @Watch("$mainStore.user.avatar", { immediate: true, deep: true })
    changeAvatar(): void {
        if (this.avatar) {
            this.iconPath = `${process.env.VUE_APP_API_URL}files/${this.avatar}`
            return
        }
        this.iconPath = require("@/assets/images/not-avatar.png")
    }

    @Prop({ type: String, default: "min" })
    readonly width!: string

    @Prop({ type: String, default: "" })
    readonly path!: string

    @Prop({ type: Boolean, default: false })
    readonly student!: boolean

    iconPath = ""

    get avatar(): string {
        if (this.path) return this.path
        if (this.student) return this.path
        return this.$mainStore.user.avatar
    }

    get inlineClass(): string[] {
        return [`avatar--${this.width}`]
    }

    loadError(): void {
        this.iconPath = require("@/assets/images/not-avatar.png")
    }
}
</script>

<style lang="scss">
    .avatar {
        img {
            border-radius: 40px;
        }
        &--min {
            img {
                max-width: 50px;
                border-radius: 10px;
            }
        }
        &--max {
            img {
                max-width: 117px;
                border-radius: 30px;
            }
        }
        &--full {
            img {
                max-width: 238px;
            }
        }
    }

    @media all and (max-width: 1366px) {
        .avatar {
            &--min {
                img {
                    border-right: 20px;
                }
            }
        }
    }

    @media all and (max-width: 1000px) {
        .avatar {
            &--min {
                img {
                    border-right: 20px;
                }
            }
        }
    }
</style>