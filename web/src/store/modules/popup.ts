import { State, Mutation } from "vuex-simple"
import { EventData } from "@/definitions/interfaces"
import { Store } from "@/store/store"

const initEventDataState = () => ({
    _id:       "",
    date:      new Date(),
    end_time:  "",
    name:      "",
    price:     "500",
    place_id:  "",
    address:   "",
    cover:     undefined,
    payment:   "",
    status:    [],
    status_id: "",
})

export class Popup {

    constructor(private $mainStore: Store) {}

    @State()
    activeCreatePopup = false

    @State()
    activeRecordPopup = false

    @State()
    recordedState: EventData = initEventDataState()

    @State()
    activeCancelPopup = false

    @State()
    canceledState: EventData = initEventDataState()

    @State()
    activeWelcomePopup = false

    @State()
    activePaymentPopup = false

    @State()
    typePayment = ""

    @State()
    updatePopup = false

    @State()
    activeCropPopup = false

    @State()
    activeRemovePopup = false

    @State()
    removedState: EventData = initEventDataState()

    @State()
    activeProjectInfoPopup = false

    // попап удаления занятия

    @Mutation()
    public changeActiveRemovePopup(state: boolean): void {
        this.activeRemovePopup = state
        this.$mainStore.app.setDisabled(state)
        if (!state) {
            this.clearRemovedState()
        }
    }

    @Mutation()
    public changeRemovedState(state: EventData): void {
        this.removedState = state
    }

    @Mutation()
    public clearRemovedState(): void {
        this.removedState = initEventDataState()
    }

    // попап загрузки аватара

    @Mutation()
    public changeActiveCropPopup(state: boolean): void {
        this.activeCropPopup = state
        this.$mainStore.app.setDisabled(state)
    }

    // попап оплаты

    @Mutation()
    public changeActivePaymentPopup(state: boolean): void {
        this.activePaymentPopup = state
        this.$mainStore.app.setDisabled(state)
        if (!state) {
            this.setTypePayment("")
        }
    }

    @Mutation()
    public setTypePayment(type: string): void {
        this.typePayment = type
    }

    // попап приветствие

    @Mutation()
    public changeActiveWelcomePopup(state: boolean): void {
        this.activeWelcomePopup = state
        this.$mainStore.app.setDisabled(state)
    }

    // попап информации о проекте

    @Mutation()
    public changeActiveProjectInfoPopup(state: boolean): void {
        this.activeProjectInfoPopup = state
        this.$mainStore.app.setDisabled(state)
    }

    // попап отмены

    @Mutation()
    public changeActiveCancelPopup(state: boolean): void {
        this.activeCancelPopup = state
        this.$mainStore.app.setDisabled(state)
        if (!state) {
            this.clearCanceledState()
        }
    }

    @Mutation()
    public changeCanceledState(state: EventData): void {
        this.canceledState = state
    }

    @Mutation()
    public clearCanceledState(): void {
        this.canceledState = initEventDataState()
    }

    // попап записи

    @Mutation()
    public changeActiveRecordPopup(state: boolean): void {
        this.activeRecordPopup = state
        this.$mainStore.app.setDisabled(state)
        if (!state) {
            this.clearRecordedState()
        }
    }

    @Mutation()
    public changeRecordedState(state: EventData): void {
        this.recordedState = state
    }

    @Mutation()
    public clearRecordedState(): void {
        this.recordedState = initEventDataState()
    }
}