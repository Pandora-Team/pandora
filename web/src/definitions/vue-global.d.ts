import paths from "@/router/paths"
import { instance } from "@/store/index.ts"

declare module "vue/types/vue" {
    interface Vue {
        $super: (method: string, ...params: unknown[]) => unknown
        $mainPaths: typeof paths
        $mainStore: typeof instance
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