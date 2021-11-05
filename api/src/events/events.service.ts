import {Injectable} from "@nestjs/common";
import {Model, ObjectId} from "mongoose";
import {Events, EventsDocument} from "./events.schema";
import {InjectModel} from "@nestjs/mongoose";
import {CreateEventDto} from "./create-event.dto";
import {PlacesService} from "../places/places.service";
import {FileType, FileService} from "../file/file.service";
import {StatusesService} from "../statuses/statuses.service";
import * as dayjs from 'dayjs'
import {UsersService} from "../users/users.service";

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
        private placesService: PlacesService,
        private fileService: FileService,
        private statusesService: StatusesService,
        private usersService: UsersService
    ) {}

    async createEvent(dto: CreateEventDto, cover): Promise<Events> {
        const nameFolder = "events"
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
        const coverPath = this.fileService.createFile(FileType.IMAGE, cover, nameFolder)
        return this.eventsModel.create({...result, address: newAddress, cover: coverPath})
    }

    async getAllEvents(id: string): Promise<Events[]>{
        const events = await this.eventsModel.find({date: {$gte: new Date()}})
        const sortedEvents = this.sortArrayOnDate(events)
        return await this.getStatuses(sortedEvents, id)
    }

    async getAllEventsWithStudents(): Promise<Events[]> {
        const date = dayjs().add(1, "day").format()
        const events = await this.eventsModel.find({date: {$gte: new Date(date)}})
        const sortedEvents = this.sortArrayOnDate(events)
        return await this.getUserInfoForEvent(sortedEvents)
    }

    async getUserInfoForEvent(events: Events[]): Promise<Events[]>  {
        return Promise.all(events.map( async event => {
            for (const user of event.users_id) {
                // @ts-ignore
                const objStatuses = await this.statusesService.getStatuses(event._id, user)
                const objUser = await this.usersService.getUserById(user)
                if (objStatuses && objUser) {
                    // @ts-ignore
                    const { payment_status, event_status, _id } = objStatuses
                    const { name, avatar } = objUser
                    const newObj = { payment_status, event_status, status_id: _id, name, avatar }
                    event.users.push(newObj)
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

    async updateEvent(id: ObjectId, dto: CreateEventDto): Promise<any> {
        return this.eventsModel.updateOne({_id: id}, {...dto})
    }

    async deleteEvent(id: ObjectId): Promise<Events>{
        return this.eventsModel.findByIdAndDelete({_id: id})
    }

    sortArrayOnDate(array: Events[]): Events[] {
        return array.sort(function compare(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
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
            return event
        }))
    }

}