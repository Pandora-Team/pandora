import { State, Mutation } from "vuex-simple"
import { EventData } from "@/constants/interfaces"

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
    createdState: EventData = initCreateState()

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