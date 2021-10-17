<template>
    <div class="logo">
        <img
            src="@/assets/svg/logo.svg"
            alt="logo"
        >
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class LkLogo extends Vue {

}
</script>

<style lang="scss">
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 50px auto 100px;
    }
</style>