import { State, Mutation } from "vuex-simple"
import { EventData } from "@/definitions/interfaces"
import { Store } from "@/store/store"
import { cloneDeep } from "lodash"

const initCreateState = () => ({
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
    createdState: EventData = initCreateState()

    @State()
    activeRecordPopup = false

    @State()
    recordedState: EventData = initCreateState()

    @State()
    activeCancelPopup = false

    @State()
    canceledState: EventData = initCreateState()

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
        this.canceledState = initCreateState()
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
        this.recordedState = initCreateState()
    }

    // попап создания

    @Mutation()
    public changeActiveCreatePopup(state: boolean): void {
        this.activeCreatePopup = state
        this.$mainStore.app.setDisabled(state)
        if (!state) {
            this.clearCreatedState()
        }
    }

    @Mutation()
    public changeCreatedState(state: EventData): void {
        this.updatePopup = true
        this.createdState = cloneDeep(state)
    }

    @Mutation()
    public clearCreatedState(): void {
        this.createdState = initCreateState()
        this.updatePopup = false
    }

    @Mutation()
    public changeCover(cover: File): void {
        this.createdState.cover = cover
    }

    @Mutation()
    public changeDate(date: Date): void {
        this.createdState.date = date
    }

    @Mutation()
    public changeEndTime(endTime: string): void {
        this.createdState.end_time = endTime
    }

    @Mutation()
    public changeName(name: string): void {
        this.createdState.name = name
    }

    @Mutation()
    public changePrice(price: string): void {
        this.createdState.price = price
    }

    @Mutation()
    public changeAddress(address: string): void {
        this.createdState.address = address
    }

    @Mutation()
    public changePlaceId(place_id: string): void {
        this.createdState.place_id = place_id
    }

}