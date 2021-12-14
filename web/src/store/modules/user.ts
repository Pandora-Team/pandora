import { State, Mutation, Action, Getter } from "vuex-simple"
import { getUser } from "@/api/users"
import { SocialData } from "@/definitions/interfaces"
import { Store } from "@/store/store"
import notification from "@/definitions/notification"
import * as Sentry from "@sentry/vue"

export class User {

    constructor(private $mainStore: Store) {}

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

    @State()
    vk = ""

    @State()
    instagram = ""

    @State()
    telegram = ""

    @Action()
    async getUserInfo(): Promise<void> {
        try {
            const res = await getUser(this.id)
            const { data } = res
            this.updateUserInfo(data)
        } catch (e) {
            this.$mainStore.notification.changeNotification({ state: true, ...notification.error })
            throw new Error(`Error get User Info - ${e}`)
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
            name?: string
            role?: string
            surname?: string
            birthday?: string
            avatar?: string
            vk?: string
            instagram?: string
            telegram?: string
        },
    ): void {
        this.name = obj.name || ""
        this.role = obj.role || ""
        this.surname = obj.surname || ""
        this.birthday = obj.birthday || ""
        this.avatar = obj.avatar || ""
        this.vk = obj.vk || ""
        this.instagram = obj.instagram || ""
        this.telegram = obj.telegram || ""
        Sentry.setUser({
            username: this.name,
            isAdmin:  this.isAdmin,
        })
    }

    @Mutation()
    public clearUserInfo(): void {
        this.id = ""
        this.name = ""
        this.role = ""
        this.surname = ""
        this.birthday = ""
        this.avatar = ""
        this.vk = ""
        this.instagram = ""
        this.telegram = ""
    }

    @Mutation()
    public setName(name: string): void {
        this.name = name
    }

    @Mutation()
    public setSurname(surname: string): void {
        this.surname = surname
    }

    @Mutation()
    public setBirthday(birthday: string): void {
        this.birthday = birthday
    }

    @Mutation()
    public setVk(vk: string): void {
        this.vk = vk
    }

    @Mutation()
    public setTelegram(telegram: string): void {
        this.telegram = telegram
    }

    @Mutation()
    public setInstagram(instagram: string): void {
        this.instagram = instagram
    }

    @Mutation()
    public setAvatar(avatar: string): void {
        this.avatar = avatar
    }

    @Getter()
    public get isAdmin(): boolean {
        return this.role === "admin"
    }

    @Getter()
    public get fullName(): string {
        return `${this.name} ${this.surname}`
    }

    @Getter()
    public get socialLink(): SocialData[] {
        const data = []
        let id = 1
        if (this.vk) {
            data.push({ id: id, path: this.vk, icon: "vk" })
            id++
        }
        if (this.instagram) {
            data.push({ id: id, path: this.instagram, icon: "inst" })
            id++
        }
        if (this.telegram) {
            data.push({ id: id, path: this.telegram, icon: "telegram" })
        }
        return data
    }

}