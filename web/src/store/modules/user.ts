import { State, Mutation } from "vuex-simple"

export class User {

    @State()
    id = ""

    @State()
    name = ""

    @State()
    role = ""

    @Mutation()
    public updateUserInfo(user: {name: string, role: string, id: string}): void {
        this.id = user.id
        this.name = user.name
        this.role = user.role
    }

}