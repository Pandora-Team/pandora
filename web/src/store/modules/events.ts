import { State, Mutation, Action, Getter } from "vuex-simple"
import { EventData } from "@/definitions/interfaces"
import { getAllEvent, getNearestEvent } from "@/api/events"
import { Store } from "@/store/store"
import { statusData, typesStatus } from "@/definitions/typeStatus"
import { cloneDeep, isEmpty } from "lodash"
import notification from "@/definitions/notification"

export class Events {

    constructor(private $mainStore: Store) {}

    @State()
    listEvents: EventData[] = []

    @State()
    nearestEvent: EventData | undefined

    @Mutation()
    public addEventToList(event: EventData): void {
        if (!this.listEvents.length) {
            event.status.splice(0, event.status.length)
            event.status.push(typesStatus.nearest.name)
            this.nearestEvent = cloneDeep(event)
        }
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
                this.updateListEvent(events)
            }
        } catch (e) {
            this.$mainStore.notification.changeNotification({ state: true, ...notification.error })
            throw new Error(`Error Get All Event - ${e}`)
        }
    }

    @Action()
    public async getNearestEventId(): Promise<void> {
        try {
            const { data } = await getNearestEvent()
            if (isEmpty(data)) return
            this.setNearestEvent(data._id)
        } catch (e) {
            this.$mainStore.notification.changeNotification({ state: true, ...notification.error })
            throw new Error(`Error Get Nearest Event - ${e}`)
        }
    }

    @Mutation()
    private setNearestEvent(id: string): void {
        const nearestEvent = this.listEvents.find(event => event._id === id)
        this.nearestEvent = cloneDeep(nearestEvent)
    }

    @Mutation()
    private updateNearestEvent(): void {
        const nearestEvent = this.listEvents.find(event => event._id === this.nearestEvent?._id)
        this.nearestEvent = cloneDeep(nearestEvent)
    }

    @Getter()
    public get hasNearestEvent(): boolean {
        return Boolean(this.nearestEvent)
    }

    @Mutation()
    private updateListEvent(list: EventData[]): void {
        this.listEvents = cloneDeep(list)
        if (this.nearestEvent?._id) {
            this.updateNearestEvent()
        } else {
            this.getNearestEventId()
        }

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
                if (event._id === this.nearestEvent?._id) {
                    event.status.push(typesStatus.nearest.name)
                }
            }
            return event
        })
        this.updateListEvent(newList)
    }

    @Mutation()
    public removeEvent(id: string): void {
        const newListEvents = this.listEvents.filter(event => event._id !== id)
        this.updateListEvent(newListEvents)
    }

}