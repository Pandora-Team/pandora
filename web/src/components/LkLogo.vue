<template>
    <div class="logo">
        <simple-svg
            :src="iconPath"
            width="94px"
            height="100%"
        />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class LkLogo extends Vue {
    get iconPath(): string {
        return require("@/assets/svg/logo.svg")
    }
}
</script>

<style lang="scss">
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 50px auto 60px;
        @media all and (max-width: 1000px) {
            width: 70px;
        }
    }
</style>