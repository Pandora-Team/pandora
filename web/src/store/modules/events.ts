import { State, Mutation, Action } from "vuex-simple"
import { EventData } from "@/constants/interfaces"
import { getAllEvent } from "@/api/events"
import { Store } from "@/store/store"
import { statusData } from "@/constants/typeStatus"
import { cloneDeep } from "lodash"

export class Events {

    constructor(private $mainStore: Store) {}

    @State()
    listEvents: EventData[] = []

    @Mutation()
    public addEventToList(event: EventData): void {
        this.listEvents.push(event)
    }

    @Action()
    public async getListEvents(): Promise<void> {
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
        this.listEvents = cloneDeep(newList)
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

}