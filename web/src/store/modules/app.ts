import { State, Mutation } from "vuex-simple"

export class App {

    @State()
    disable = false

    @State()
    loading = false

    @State()
    isMobile = false

    @State()
    needScrollIntoBody = false

    @Mutation()
    public setNeedScrollIntoBody(state: boolean): void {
        this.needScrollIntoBody = state
    }

    @Mutation()
    public setDisabled(status: boolean): void {
        this.disable = status
    }

    @Mutation()
    public setLoading(state: boolean): void {
        this.loading = state
    }

    @Mutation()
    public setIsMobile(state: boolean): void {
        this.isMobile = state
    }

}