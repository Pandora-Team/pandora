import { State, Mutation } from "vuex-simple"
import { Store } from "@/store/store"

export class Events {

    constructor(private store: Store) {
    }

    @State()
    activePopup = false

    @Mutation()
    private changePopup(state: boolean) {
        this.activePopup = state
    }

}