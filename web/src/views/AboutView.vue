<template>
    <div class="information">
        <h1>О классах PANDORA</h1>
        <info-banner bg-class="somi" />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import InfoBanner from "@/components/InfoBanner.vue"

@Component({
    components: {
        InfoBanner,
    },
})
export default class AboutView extends Vue {

}
</script>

<style lang="scss">

</style>