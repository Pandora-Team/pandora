import { State, Mutation, Action, Getter } from "vuex-simple"
import { getUser } from "@/api/users"
import { SocialData } from "@/definitions/interfaces"
import { Store } from "@/store/store"
import notification from "@/definitions/notification"
import * as Sentry from "@sentry/vue"
import { logout } from "@/api/auth"

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

    @State()
    dataReceived = false

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
    async logout(): Promise<void> {
        await logout()
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
        this.dataReceived = true
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
        return [
            {
                id: 1, path: this.vk, icon: "vk", active: Boolean(this.vk),
            },
            {
                id: 2, path: this.instagram, icon: "inst", active: Boolean(this.instagram),
            },
            {
                id: 3, path: this.telegram, icon: "telegram", active: Boolean(this.telegram),
            },
        ]
    }

}