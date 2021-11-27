import { State, Mutation, Action } from "vuex-simple"
import { EventData } from "@/definitions/interfaces"
import { getAllEvent } from "@/api/events"
import { Store } from "@/store/store"
import { statusData } from "@/definitions/typeStatus"
import { cloneDeep } from "lodash"

export class Events {

    constructor(private $mainStore: Store) {}

    @State()
    listEvents: EventData[] = []

    @Mutation()
    public addEventToList(event: EventData): void {
        this.listEvents.push(event)
    }

    @Mutation()
    public updateEventIntoList(updatedEvent: EventData): void {
        const newListEvents = this.listEvents.map(event => {
            if (event._id === updatedEvent._id) {
                event.date = updatedEvent.date
                event.price = updatedEvent.price
                event.name = updatedEvent.name
                event.end_time = updatedEvent.end_time
                event.address = updatedEvent.address
                event.place_id = updatedEvent.place_id
            }
            return event
        })
        this.updateListEvent(newListEvents)
    }

    @Action()
    public async getListEvents(): Promise<void> {
        try {
            const res = await getAllEvent()
            const events: EventData[] = res.data
            if (events?.length) {
                const updateData = events.map(event => {
                    event.date = new Date(event.date)
                    return event
                })
                this.updateListEvent(updateData)
            }
        } catch (e) {
            console.log(e)
        }
    }

    @Mutation()
    private updateListEvent(list: EventData[]): void {
        this.listEvents = cloneDeep(list)
    }

    @Mutation()
    public updateStatuses(data: statusData): void {
        const newList = this.listEvents.map(event => {
            if (event._id === data.event_id) {
                event.status.splice(0, event.status.length)
                if (data.event_status && data.payment_status) {
                    event.status.push(data.event_status, data.payment_status)
                }
                event.users_id?.push(this.$mainStore.user.id)
                if (data._id) {
                    event.status_id = data._id
                }
            }
            return event
        })
        this.updateListEvent(newList)
    }

    @Mutation()
    public clearStatuses(_id: string): void {
        const newList = this.listEvents.map(event => {
            if (event._id === _id) {
                event.status.splice(0, event.status.length)
                event.status_id = ""
                event.users_id = event.users_id?.filter(user => user !== this.$mainStore.user.id)
            }
            return event
        })
        this.listEvents = cloneDeep(newList)
    }

    @Mutation()
    public removeEvent(id: string): void {
        const newListEvents = this.listEvents.filter(event => event._id !== id)
        this.updateListEvent(newListEvents)
    }

}