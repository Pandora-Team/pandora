import { State, Mutation } from "vuex-simple"
import { NotificationData } from "@/definitions/interfaces"

export class Notification {

    @State()
    visible = false

    @State()
    text = ""

    @State()
    typeNotification = ""

    @Mutation()
    public changeNotification(data: NotificationData): void {
        if (!data) return
        this.text = data.text
        this.typeNotification = data.type
        this.visible = data.state
    }

}