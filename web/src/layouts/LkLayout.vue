<template>
    <div class="lk">
        <h1>Личный кабинет</h1>
        <div class="lk-body">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class LkLayout extends Vue {

}
</script>

<style lang="scss">

</style>