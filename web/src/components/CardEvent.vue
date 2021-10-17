<template>
    <div class="card-event">
        <slot />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({
    components: {},
})
export default class CardEvent extends Vue {

}
</script>

<style lang="scss">
   
</style>