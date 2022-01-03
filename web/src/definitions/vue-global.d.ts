import paths from "@/router/paths"
import notification from "@/definitions/notification"
import { instance } from "@/store/index.ts"
import wb from "@/registerServiceWorker"

declare module "vue/types/vue" {
    interface Vue {
        $super: (method: string, ...params: unknown[]) => unknown
        $mainPaths: typeof paths
        $mainStore: typeof instance
        $mainNotification: typeof notification
        $workbox: typeof wb
        beforeCreate?(): void
        created?(): void
        beforeMount?(): void
        mounted?(): void
        beforeDestroy?(): void
        destroyed?(): void
        beforeUpdate?(): void
        updated?(): void
    }
}