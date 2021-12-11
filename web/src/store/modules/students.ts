import { State, Mutation, Action } from "vuex-simple"
import { getEventsWithUsers } from "@/api/events"
import { EventData } from "@/definitions/interfaces"
import { cloneDeep } from "lodash"
import { Store } from "@/store/store"
import notification from "@/definitions/notification"

export class Students {

    constructor(private $mainStore: Store) {}

    @State()
    listEvents: EventData[] = []

    @Action()
    public async getListEvents(): Promise<void> {
        try {
            const res = await getEventsWithUsers()
            this.changeListEvents(res.data)
        } catch (e) {
            this.$mainStore.notification.changeNotification({ state: true, ...notification.error })
            throw new Error(`Error Get Event With Users - ${e}`)
        }
    }

    @Mutation()
    private changeListEvents(data: EventData[]): void {
        this.listEvents = cloneDeep(data)
    }

    @Mutation()
    public updateStatusPayment(obj: {eventId: string, statusId: string, paymentStatus: string}): void {
        const newListEvents = this.listEvents.map(event => {
            if (event._id === obj.eventId) {
                if (event.users?.length) {
                    const user = event.users.find(user => user.status_id === obj.statusId)
                    if (user) {
                        user.payment_status = obj.paymentStatus
                    }
                }

            }
            return event
        })
        this.changeListEvents(newListEvents)
    }

    @Mutation()
    public updateStatusEvent(obj: {eventId: string, statusId: string, eventStatus: string}): void {
        const newListEvents = this.listEvents.map(event => {
            if (event._id === obj.eventId) {
                if (event.users?.length) {
                    const user = event.users.find(user => user.status_id === obj.statusId)
                    if (user) {
                        user.event_status = obj.eventStatus
                    }
                }

            }
            return event
        })
        this.changeListEvents(newListEvents)
    }

}