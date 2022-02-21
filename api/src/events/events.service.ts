import {Injectable} from "@nestjs/common";
import {Model, ObjectId} from "mongoose";
import {Events, EventsDocument} from "./events.schema";
import {InjectModel} from "@nestjs/mongoose";
import {CreateEventData, RecordOnEventData} from "./definitions";
import {PlacesService} from "../places/places.service";
import {FileService} from "../file/file.service";
import {StatusesService} from "../statuses/statuses.service";
import {UsersService} from "../users/users.service";
import * as dayjs from "dayjs";
import {TypeStatus} from "../statuses/definitions";
import { DateTime } from "luxon"

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
        private placesService: PlacesService,
        private fileService: FileService,
        private statusesService: StatusesService,
        private usersService: UsersService
    ) {}

    async createEvent(dto: CreateEventData, coverId): Promise<Events> {
        let newAddress
        const { place_id, address, ...result } = dto
        if (address) {
            const place = await this.placesService.createPlace({ address })
            newAddress = place.address
        }
        if(place_id) {
            const place = await this.placesService.getOnePlace(place_id)
            newAddress = place.address
        }
        return this.eventsModel.create({...result, address: newAddress, cover: coverId})
    }

    async getAllEvents(id: string): Promise<Events[]>{
        const events = await this.eventsModel.find({date: {$gte: new Date()}})
        const sortedEvents = this.sortArrayOnDate(events)
        const discount = await this.checkDiscountForUser(id)
        if (discount) {
            const discountAmount = 20
            this.setDiscountInEvents(sortedEvents, discountAmount)
        }
        return await this.getStatuses(sortedEvents, id)
    }

    // Проверка давать ли скидку
    async checkDiscountForUser(userId: string) {
        const user = await this.usersService.getUserById(userId)
        const beginStock = 1644958800000
        // список занятий пользователя
        const eventsUser = await this.getEventListForUser(userId)
        // массив новичков, кто давно зарегистрирован, но ни разу не ходил
        const newbieUsers = [
            "61d47f99082349001d59666c", // Левина
            "61d4c286082349001d596674", // Босых
            "61d4dc05082349001d596676", // Бучева
            "61dc6e5649d5f3001e7e6bcc", // Дектярникова
            "61e4575940e9e5001eedc64f", // марданова
            "61e5776440e9e5001eedc652", // Соловьева
            "61ec5d5d40e9e5001eedc65f", // Рязанова
            "61f03ba02d9133001eb442fa", // Аленичева
            "61f132042d9133001eb44311", // Кузнецова
            "61f475ba2d9133001eb44323", // Супранович
            "61fbb5af204d0d0020b1bdc6", // Суханова
            "6200252c204d0d0020b1bdcb", // Kolodyazhnaya
            "620159e0204d0d0020b1bdcc", // У
            "6205616b204d0d0020b1bdcd", // рассадина
            "620f8f63204d0d0020b1bdf0" // Попова
        ]
        // для новичков
        if (
            (DateTime.fromISO(user.reg_date).toMillis() > beginStock && !eventsUser.length) ||
            (!eventsUser.length && newbieUsers.includes(userId))
        ) {
            return true
        }
        return false
    }

    // Установка скидки в каждое занятие
    setDiscountInEvents(events, discountAmount) {
        return events.map(event => {
            event.discount = true
            event.price = event.price / 100 * (100 - discountAmount)
            return event
        })
    }

    async getAllEventsWithStudents(): Promise<Events[]> {
        const events = await this.eventsModel.find()
        const sortedEvents = this.sortArrayOnDate(events, true)
        return await this.getUserInfoForEvent(sortedEvents)
    }

    async getUserInfoForEvent(events: Events[]): Promise<Events[]>  {
        return Promise.all(events.map( async event => {
            for (const user of event.recorded) {
                if (user) {
                    // @ts-ignore
                    const objStatuses = await this.statusesService.getStatuses(event._id, user)
                    const objUser = await this.usersService.getUserById(user)
                    if (objStatuses && objUser) {
                        // @ts-ignore
                        const { payment_status, event_status, _id } = objStatuses
                        const { name, avatar, surname } = objUser
                        const newObj = { payment_status, event_status, status_id: _id, name, avatar, surname }
                        event.recorded_users.push(newObj)
                    }
                }
            }
            for (const user of event.canceled) {
                if (user) {
                    // @ts-ignore
                    const objStatuses = await this.statusesService.getStatuses(event._id, user)
                    const objUser = await this.usersService.getUserById(user)
                    if (objStatuses && objUser) {
                        // @ts-ignore
                        const { payment_status, event_status, _id } = objStatuses
                        const { name, avatar, surname } = objUser
                        const newObj = { payment_status, event_status, status_id: _id, name, avatar, surname }
                        event.canceled_users.push(newObj)
                    }
                }
            }
            return event
        }))
    }

    async getOneEvent(id: ObjectId): Promise<Events>{
        return this.eventsModel.findById({_id: id})
    }

    async getNearestEvent(id: string): Promise<Events> {
        const sortedEvents = await this.getAllEvents(id)
        return sortedEvents[0]
    }

    async updateEvent(id: ObjectId, dto: CreateEventData, coverId?: string): Promise<any> {
        const event = await this.getOneEvent(id)
        if (coverId && event.cover) {
            await this.fileService.deleteFile(event.cover)
            await this.eventsModel.updateOne({_id: id}, {...dto, cover: coverId})
            return { update: true, cover: coverId }
        }
        await this.eventsModel.updateOne({_id: id}, {...dto})
        return { update: true }
    }

    async deleteEvent(id: ObjectId): Promise<Events> {
        await this.statusesService.clearStatusesAllUsers(String(id))
        const event = await this.eventsModel.findByIdAndDelete({_id: id})
        if (event.cover) {
            await this.fileService.deleteFile(event.cover)
        }
        return event
    }

    sortArrayOnDate(array: Events[], reverse = false): Events[] {
        return array.sort(function compare(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            if (reverse) {
                // @ts-ignore
                return dateB - dateA;
            }
            // @ts-ignore
            return dateA - dateB;
        });
    }

    async getStatuses(events: Events[], userId: string): Promise<Events[]> {
        return Promise.all(events.map( async (event, index) => {
            if (index === 0) {
                event.status.push("nearest")
            }
            //@ts-ignore
            const objStatuses = await this.statusesService.getStatuses(event._id, userId)
            if (objStatuses) {
                //@ts-ignore
                event.status_id = objStatuses._id
                event.status.push(objStatuses.event_status, objStatuses.payment_status)
            }
            event.status = event.status.filter(e => e.length > 0)
            return event
        }))
    }

    async getEventListForUser(userId: string): Promise<Events[]> {
        const listEvents = []
        const events = await this.eventsModel.find({})
        for(let i = 0; i < events.length; i++) {
            if (events[i]?.recorded.includes(userId) && dayjs().isAfter(dayjs(events[i].date))) {
                const eventInfo = {
                    _id: events[i]._id,
                    name: events[i].name,
                    date: events[i].date
                }
                listEvents.push(eventInfo)
            }
        }
        return listEvents
    }

    // Добавление участника к занятию
    async addUserToEvent(eventId: string, userId: string): Promise<void> {
        await this.eventsModel.updateOne({_id: eventId}, {$addToSet: {recorded: userId}})
    }

    // Удаление участника из занятия
    async removeUserFromEvent(eventId: string, userId: string): Promise<void> {
        await this.eventsModel.updateOne({_id: eventId}, {$pull: {recorded: userId}})
    }

    // Добавление участника к списку участников, которые отменили запись
    async addUserInCanceled(eventId: string, userId: string) {
        await this.eventsModel.updateOne({_id: eventId}, {$addToSet: {canceled: userId}})
    }

    // Удаление участника из списка участников, которые отменили запись
    async removeUserInCanceled(eventId: string, userId: string) {
        await this.eventsModel.updateOne({_id: eventId}, {$pull: {canceled: userId}})
    }

    // Отмена записи на занятие
    async cancelRecordOnEvent(status_id: string) {
        const status = await this.statusesService.clearStatus(status_id)
        if (status) {
            await this.removeUserFromEvent(status.event_id, status.user_id)
            await this.addUserInCanceled(status.event_id, status.user_id)
            if (status.payment_status === TypeStatus.Paid) {
                const newStatus = {
                    user_id: status.user_id,
                    event_id: status.event_id,
                    payment_status: TypeStatus.NeedRefund,
                    event_status: TypeStatus.NotVisited
                }
                await this.statusesService.createStatus(status.user_id, newStatus)
            }
        }
    }

    // Запись на занятие
    async recordOnEvent(userId: string, data: RecordOnEventData) {
        let resStatus
        const { event_id, payment_status } = data
        await this.removeUserInCanceled(event_id, userId)
        const status = await this.statusesService.getStatuses(event_id, userId)
        if (status) {
            const newStatus = {
                user_id: status.user_id,
                event_id: status.event_id,
                payment_status,
                event_status: TypeStatus.Go,
            }
            if (status.payment_status === TypeStatus.NeedRefund) {
                newStatus.payment_status = TypeStatus.Paid
            }
            // @ts-ignore
            await this.statusesService.updateStatuses(status._id, newStatus)
            resStatus = newStatus
        } else {
            const newStatus = {
                user_id: userId,
                event_id: event_id,
                payment_status: payment_status,
                event_status: TypeStatus.Go,
            }
            resStatus = await this.statusesService.createStatus( userId, newStatus )
        }
        await this.addUserToEvent( event_id, userId )
        return resStatus
    }

}