<template>
    <div class="event-banner">
        <slot />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({
    components: {},
})
export default class EventBanner extends Vue {

}
</script>

<style lang="scss">
   
</style>