<template>
    <div class="lk">
        <div class="lk-aside">
            <lk-logo />
            <lk-nav />
        </div>
        <lk-body />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import LkLogo from "@/components/LkLogo.vue"
import LkBody from "@/components/LkBody.vue"
import LkNav from "@/components/LkNav.vue"

@Component({
    components: {
        LkLogo,
        LkBody,
        LkNav,
    },
})
export default class LkLayout extends Vue {

}
</script>

<style lang="scss">
    .lk {
        display: flex;
        min-height: 100vh;
        background-color: #242424;
        background-image: url("../assets/svg/lk-line.svg");
        background-repeat: no-repeat;
        background-position: left bottom;
        background-size: 280px 234px;
        &-aside {
            min-width: 260px;
        }
    }
</style>