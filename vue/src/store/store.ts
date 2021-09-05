import { Module } from "vuex-simple"
import { App } from "./modules/app"

export class Store {
    @Module()
    public app = new App(this)
}
