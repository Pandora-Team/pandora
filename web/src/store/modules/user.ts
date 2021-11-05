import { State, Mutation, Action } from "vuex-simple"
import { getUser } from "@/api/users"

export class User {

    @State()
    id = ""

    @State()
    name = ""

    @State()
    surname = ""

    @State()
    role = ""

    @State()
    birthday = ""

    @State()
    avatar = ""

    @Action()
    async getUserInfo(): Promise<void> {
        try {
            const res = await getUser(this.id)
            const { data } = res
            this.updateUserInfo(data)
        } catch (e) {
            console.log(e)
        }
    }

    @Action()
    logout(): void {
        localStorage.removeItem("at")
        this.clearUserInfo()
    }

    @Mutation()
    public setUserId(id: string): void {
        this.id = id
    }

    @Mutation()
    public updateUserInfo(
        obj:{
            name: string
            role: string
            surname: string
            birthday: string
            avatar: string
        },
    ): void {
        this.name = obj.name || ""
        this.role = obj.role || ""
        this.surname = obj.surname || ""
        this.birthday = obj.birthday || ""
        this.avatar = obj.avatar || ""
    }

    @Mutation()
    public clearUserInfo(): void {
        this.id = ""
        this.name = ""
        this.role = ""
        this.surname = ""
        this.birthday = ""
        this.avatar = ""
    }

}