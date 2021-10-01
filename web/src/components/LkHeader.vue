<template>
    <div class="header" />
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class LkHeader extends Vue {

}
</script>

<style lang="scss">
    .header {
        padding: 25px 34px;
        border-bottom: 1px solid #d5d3d6;
        min-height: 50px;
    }
</style>