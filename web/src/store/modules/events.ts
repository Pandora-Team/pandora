import { State, Mutation, Action } from "vuex-simple"
import { EventData } from "@/constants/interfaces"
import { getAllEvent } from "@/api/events"
import { Store } from "@/store/store"
import { statusData } from "@/constants/typeStatus"
import { cloneDeep } from "lodash"

const initCreateState = () => ({
    _id:      "",
    date:     new Date(),
    end_time: "",
    name:     "",
    price:    "500",
    place_id: "",
    address:  "",
    cover:    undefined,
    payment:  "",
    status:   [],
})

export class Events {

    constructor(private $mainStore: Store) {}

    @State()
    activeCreatePopup = false

    @State()
    activeRecordPopup = false

    @State()
    activeCancelPopup = false

    @State()
    listEvents: EventData[] = []

    @State()
    createdState: EventData = initCreateState()

    @State()
    recordedState: EventData = initCreateState()

    @State()
    canceledState: EventData = initCreateState()

    @Mutation()
    public changeActiveCancelPopup(value: boolean): void {
        this.activeCancelPopup = value
    }

    @Mutation()
    public changeCanceledState(state: EventData): void {
        this.canceledState = state
    }

    @Mutation()
    public changeActiveRecordPopup(value: boolean): void {
        this.activeRecordPopup = value
    }

    @Mutation()
    public changeRecordedState(state: EventData): void {
        this.recordedState = state
    }

    @Mutation()
    public clearRecordedState(): void {
        this.recordedState = initCreateState()
    }

    @Mutation()
    public clearCanceledState(): void {
        this.canceledState = initCreateState()
    }

    @Mutation()
    public addEventToList(event: EventData): void {
        this.listEvents.push(event)
    }

    @Action()
    public async getListEvents(): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { data } = await getAllEvent()
        if (data?.length) {
            this.updateListEvent(data)
        }
    }

    @Mutation()
    private updateListEvent(list: EventData[]): void {
        this.listEvents = list
    }

    @Mutation()
    public changeCreatePopup(state: boolean): void {
        this.activeCreatePopup = state
        this.$mainStore.app.setDisabled(state)
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

    @Mutation()
    public resetCreatedState(): void {
        this.createdState = initCreateState()
    }

    @Action()
    public closeEventPopup(): void {
        this.changeActiveRecordPopup(false)
        this.clearRecordedState()
        this.changeActiveCancelPopup(false)
        this.clearCanceledState()
        this.$mainStore.app.setDisabled(false)
    }

    @Mutation()
    public updateStatuses(data: statusData): void {
        const newList = this.listEvents.map(event => {
            if (event._id === data.event_id) {
                event.status.splice(0, event.status.length)
                event.status.push(data.event_status, data.payment_status)
            }
            return event
        })
        this.listEvents = cloneDeep(newList)
    }

    @Mutation()
    public clearStatuses(_id: string): void {
        const newList = this.listEvents.map(event => {
            if (event._id === _id) {
                event.status.splice(0, event.status.length)
            }
            return event
        })
        this.listEvents = cloneDeep(newList)
    }

}