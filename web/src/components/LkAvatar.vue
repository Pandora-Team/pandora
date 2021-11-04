<template>
    <div class="avatar">
        <img
            :src="iconPath"
            alt="avatar"
        >
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class LkAvatar extends Vue {

    get iconPath(): string {
        return require("@/assets/images/not-avatar.png")
    }
}
</script>

<style lang="scss">
    .avatar {
        img {
            max-width: 50px;
        }
    }
</style>