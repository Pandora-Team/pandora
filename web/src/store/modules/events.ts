import { State, Mutation, Action } from "vuex-simple"
import { EventData } from "@/constants/interfaces"
import { getAllEvent } from "@/api/events"

const initCreateState = () => ({
    date:     new Date(),
    end_time: "",
    name:     "",
    price:    "500",
    place_id: "",
    address:  "",
    cover:    undefined,
})

export class Events {

    @State()
    activePopup = false

    @State()
    listEvents: EventData[] = []

    @State()
    createdState: EventData = initCreateState()

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
    public changePopup(state: boolean): void {
        this.activePopup = state
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

}