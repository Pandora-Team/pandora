import { Module } from "vuex-simple"
import { App } from "./modules/app"
import { Events } from "./modules/events"
import { User } from "./modules/user"

export class Store {
    @Module()
    public app = new App()

    @Module()
    public events = new Events(this)

    @Module()
    public user = new User()
}
