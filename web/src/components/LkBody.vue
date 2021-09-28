<template>
    <div class="body">
        <lk-header />
        <router-view />
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

</style>