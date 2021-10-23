import { Module } from "vuex-simple"
import { App } from "./modules/app"
import { Events } from "./modules/events"

export class Store {
    @Module()
    public app = new App(this)

    @Module()
    public events = new Events(this)
}
