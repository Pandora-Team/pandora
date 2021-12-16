<template>
    <div
        id="app"
        class="app"
    >
        <loading-view v-if="loading" />
        <router-view v-else />
        <notification />
    </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator"
import Notification from "@/components/Notification.vue"
import LoadingView from "@/components/LoadingView.vue"

@Component({
    components: {
        Notification,
        LoadingView,
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

    @Watch("$route.path", { immediate: true, deep: true })
    changeMobileView(): void {
        this.$mainStore.app.setIsMobile(window.innerWidth < 768)
    }

    @Watch("$mainStore.app.loading")
    changeLoading(): void {
        if (this.loading) {
            setTimeout(() => {
                this.$mainStore.app.setLoading(false)
            }, 3000)
        }
    }

    get loading(): boolean {
        return this.$mainStore.app.loading
    }
}
</script>

<style lang="scss">
    .app {
        overflow: hidden;
        position: relative;
    }
</style>

