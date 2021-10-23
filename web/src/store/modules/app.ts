import { State, Mutation } from "vuex-simple"

export class App {

    @State()
    disable = false

    @Mutation()
    public setDisabled(status: boolean): void {
        this.disable = status
    }

}