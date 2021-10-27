import {Injectable} from "@nestjs/common";
import {Model, ObjectId} from "mongoose";
import {Events, EventsDocument} from "./events.schema";
import {InjectModel} from "@nestjs/mongoose";
import {CreateEventDto} from "./create-event.dto";
import {PlacesService} from "../places/places.service";
import {FileType, FileService} from "../file/file.service";

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
        private placesService: PlacesService,
        private fileService: FileService
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

    async getAllEvents(): Promise<Events[]>{
        const events = await this.eventsModel.find({date: {$gte: new Date()}});
        return this.sortArrayOnDate(events)
    }

    async getOneEvent(id: ObjectId): Promise<Events>{
        return this.eventsModel.findById(id)
    }

    async getNearestEvent(): Promise<Events> {
        const events: Events[] = await this.eventsModel.find({date: {$gte: new Date()}})
        const sortedEvents = this.sortArrayOnDate(events)
        return sortedEvents[0]
    }

    async deleteEvent(id: ObjectId): Promise<Events>{
        return this.eventsModel.findByIdAndDelete(id)
    }

    sortArrayOnDate(array: Events[]): Events[] {
        return array.sort(function compare(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            // @ts-ignore
            return dateA - dateB;
        });
    }

}