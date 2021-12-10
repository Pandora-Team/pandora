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
    public changeNotification(state: boolean, obj: NotificationData): void {
        this.text = obj.text
        this.typeNotification = obj.type
        this.visible = state
    }

}