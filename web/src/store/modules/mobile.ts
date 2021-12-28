import { State, Mutation, Getter } from "vuex-simple"
import { Store } from "@/store/store"

export class Mobile {

    constructor(private $mainStore: Store) {}

    @State()
    visibleMobileMenu = false

    @State()
    openMobileMenu = false

    @Mutation()
    public setVisibleMobileMenu(status: boolean): void {
        this.visibleMobileMenu = status
    }

    @Mutation()
    public setOpenMobileMenu(status: boolean): void {
        this.openMobileMenu = status
        this.$mainStore.app.setDisabled(status)
    }

    @Getter()
    public get visibleMenu(): boolean {
        return this.visibleMobileMenu && this.$mainStore.app.isMobile
    }
}