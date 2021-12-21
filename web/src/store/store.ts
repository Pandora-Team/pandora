import { Module } from "vuex-simple"
import { App } from "./modules/app"
import { Events } from "./modules/events"
import { User } from "./modules/user"
import { Students } from "./modules/students"
import { Popup } from "./modules/popup"
import { Notification } from "./modules/notification"
import { Mobile } from "@/store/modules/mobile"

export class Store {
    @Module()
    public app = new App()

    @Module()
    public events = new Events(this)

    @Module()
    public user = new User(this)

    @Module()
    public students = new Students(this)

    @Module()
    public popup = new Popup(this)

    @Module()
    public notification = new Notification()

    @Module()
    public mobile = new Mobile(this)
}
