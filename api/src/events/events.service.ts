import {Injectable} from "@nestjs/common";
import {Model, ObjectId} from "mongoose";
import {Events, EventsDocument} from "./events.schema";
import {InjectModel} from "@nestjs/mongoose";
import {CreateEventData, RecordOnEventData, beginStock, newbieUsers} from "./definitions";
import {PlacesService} from "../places/places.service";
import {FileService} from "../file/file.service";
import {StatusesService} from "../statuses/statuses.service";
import {UsersService} from "../users/users.service";
import {TypeStatus} from "../statuses/definitions";
import { DateTime } from "luxon"
import { isEmpty } from "lodash"

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
        private placesService: PlacesService,
        private fileService: FileService,
        private statusesService: StatusesService,
        private usersService: UsersService
    ) {}

    // создание занятия
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

    // получение списка всех занятий
    async getAllEvents(id: string): Promise<Events[]>{
        const events = await this.eventsModel.find({date: {$gte: DateTime.now().minus({hour: 1}).toJSDate()}})
        const sortedEvents = this.sortArrayOnDate(events)
        const discount = await this.checkDiscountForUser(id)
        if (discount) {
            const discountAmount = 20
            this.setDiscountInEvents(sortedEvents, discountAmount)
        }
        return await this.getStatuses(sortedEvents, id)
    }

    // получение списка занятий с данными о студентах
    async getAllEventsWithStudents(): Promise<Events[]> {
        const events = await this.eventsModel.find()
        const sortedEvents = this.sortArrayOnDate(events, true)
        return await this.getUserInfoForEvent(sortedEvents)
    }

    // получение данных о пользователе из каждого занятия
    async getUserInfoForEvent(events: Events[]): Promise<Events[]>  {
        return Promise.all(events.map( async event => {
            if (event.recorded.length) {
                for (const user of event.recorded) {
                    // @ts-ignore
                    const objStatuses = await this.statusesService.getStatuses(event._id, user)
                    const objUser = await this.usersService.getUserById(user)
                    if (!isEmpty(objStatuses) && !isEmpty(objUser)) {
                        // @ts-ignore
                        const { payment_status, event_status, _id } = objStatuses
                        const { name, avatar, surname } = objUser
                        const newObj = { payment_status, event_status, status_id: _id, name, avatar, surname }
                        event.recorded_users.push(newObj)
                    }
                }
            }

            if (event.canceled.length) {
                for (const user of event.canceled) {
                    // @ts-ignore
                    const objStatuses = await this.statusesService.getStatuses(event._id, user)
                    const objUser = await this.usersService.getUserById(user)
                    if (!isEmpty(objStatuses) && !isEmpty(objUser)) {
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

    // получение одного занятия
    async getOneEvent(id: ObjectId): Promise<Events>{
        return this.eventsModel.findById({_id: id})
    }

    // получение ближайшего занятия
    async getNearestEvent(id: string): Promise<Events> {
        const sortedEvents = await this.getAllEvents(id)
        return sortedEvents[0]
    }

    // обновление данных занятия
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

    // удаление занятия
    async deleteEvent(id: ObjectId): Promise<Events> {
        await this.statusesService.clearStatusesAllUsers(String(id))
        const event = await this.eventsModel.findByIdAndDelete({_id: id})
        if (event.cover) {
            await this.fileService.deleteFile(event.cover)
        }
        return event
    }

    // сортировка занятий по дате проведения
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

    // получение статусов пользователя для списка занятий
    async getStatuses(events: Events[], userId: string): Promise<Events[]> {
        return Promise.all(events.map( async (event, index) => {
            if (index === 0) {
                event.status.push("nearest")
            }
            //@ts-ignore
            const objStatuses = await this.statusesService.getStatuses(event._id, userId)
            if (!isEmpty(objStatuses)) {
                //@ts-ignore
                event.status_id = objStatuses._id
                event.status.push(objStatuses.event_status, objStatuses.payment_status)
            }
            event.status = event.status.filter(e => e.length > 0)
            return event
        }))
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
        const status = await this.statusesService.getStatusById(status_id)
        if (status) {
            await this.removeUserFromEvent(status.event_id, status.user_id)
            await this.addUserInCanceled(status.event_id, status.user_id)
            const newStatus = {
                user_id: status.user_id,
                event_id: status.event_id,
                payment_status: TypeStatus.NotPaid,
                event_status: TypeStatus.NotVisited
            }
            if (status.payment_status === TypeStatus.Paid) {
                newStatus.payment_status = TypeStatus.NeedRefund
            }
            await this.statusesService.clearStatus(status_id)
            await this.statusesService.createStatus(status.user_id, newStatus)
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

    // Проверка давать ли скидку
    async checkDiscountForUser(userId: string) {
        const user = await this.usersService.getUserById(userId)
        // список занятий пользователя
        const eventsUser = await this.getEventListForUser(userId)
        // для новичков
        if (
            (DateTime.fromISO(user.reg_date).toMillis() > beginStock && !eventsUser.length) ||
            (!eventsUser.length && newbieUsers.includes(userId))
        ) {
            return true
        }
        // для тех, кто посещал 4 занятия подряд
        if (eventsUser.length > 3 && await this.checkVisitFourEvents(userId)) {
            return true
        }
        return false
    }

    // получение списка занятий, которые посетил пользователь
    async getEventListForUser(userId: string): Promise<Events[]> {
        const listEvents = []
        const events = await this.eventsModel.find({$and : [{recorded: {$all: [userId]}}, {date: {$lte: new Date()}}]})
        if (events.length) {
            for(let i = 0; i < events.length; i++) {
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

    // проверка на посещение всех 4-х занятий
    async checkVisitFourEvents(userId: string) {
        const events = await this.eventsModel.find({$and : [{date: {$lte: new Date()}}, {date: {$gte: new Date(beginStock)}}]})
        const sortArr = this.sortArrayOnDate(events)
        const arr = sortArr.slice(-4)
        if (arr.length < 4) return false
        let checkVisit = false
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].recorded.includes(userId)) {
                checkVisit = true
            } else {
                checkVisit = false
                break
            }
        }
        return checkVisit
    }

    // Установка скидки в каждое занятие
    setDiscountInEvents(events, discountAmount) {
        return events.map(event => {
            event.discount = true
            event.price = event.price / 100 * (100 - discountAmount)
            return event
        })
    }

}