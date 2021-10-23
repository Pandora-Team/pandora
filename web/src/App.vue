<template>
    <div
        id="app"
        class="app"
    >
        <router-view />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"

@Component({})
export default class App extends Vue {
    @Watch("$mainStore.app.disable")
    changeDisable(): void {
        const body = document.querySelector("body")
        if (this.$mainStore.app.disable) {
            body!.style.overflow = "hidden"
        } else {
            body!.style.overflow = "auto"
        }
    }
}
</script>

<style lang="scss">
    .app {

    }
</style>

