<template>
    <div class="body">
        <lk-header />
        <div class="body-wrapper">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkHeader from "@/components/LkHeader.vue"

@Component({
    components: {
        LkHeader,
    },
})
export default class LkBody extends Vue {

}
</script>

<style lang="scss">
    .body {
        width: 100%;
        margin: 40px;
        background: #FFFFFF;
        border-radius: 40px;
        &-wrapper {
            padding: 40px;
        }
    }
</style>