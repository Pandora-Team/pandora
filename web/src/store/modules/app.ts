import { State, Mutation } from "vuex-simple"
import { Store } from "@/store/store"

export class App {

    constructor(private store: Store) {
    }

    @State()
    disable = false

    @Mutation()
    private setDisabled(status: boolean) {
        this.disable = status
    }

}