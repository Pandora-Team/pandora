<template>
    <div
        id="app"
        class="app"
    >
        <router-view />
        <notification />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"
import Notification from "@/components/Notification.vue"

@Component({
    components: {
        Notification,
    },
})
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
        overflow: hidden;
        position: relative;
    }
</style>

