import { State, Mutation } from "vuex-simple"
import { Store } from "@/store/store"

export class App {

    constructor(private store: Store) {
    }

    @State()
    disabled = false

    @Mutation()
    private setDisabled(disabled: boolean) {
        this.disabled = disabled
    }

}