import { State, Mutation } from "vuex-simple"
import { Store } from "@/store/store"

export class Mobile {

    constructor(private $mainStore: Store) {}

    @State()
    visibleMobileMenu = false

    @Mutation()
    public setVisibleMobileMenu(status: boolean): void {
        this.visibleMobileMenu = status
        this.$mainStore.app.setDisabled(status)
    }
}