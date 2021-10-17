import {Injectable} from "@nestjs/common";
import {Model, ObjectId} from "mongoose";
import {Events, EventsDocument} from "./events.schema";
import {InjectModel} from "@nestjs/mongoose";
import {CreateEventDto} from "./create-event.dto";
import {PlacesService} from "../places/places.service";

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
        private placesService: PlacesService
    ) {}

    async createEvent(dto: CreateEventDto): Promise<Events> {
        let newAddress
        const { place_id, address, ...result } = dto
        if (address) {
            const { address } = dto
            const place = await this.placesService.createPlace({ address })
            newAddress = place.address
        }
        if(place_id) {
            const { place_id } = dto
            const place = await this.placesService.getOnePlace(place_id)
            newAddress = place.address
        }
        return this.eventsModel.create({...result, address: newAddress})
    }

    async getAllEvents(): Promise<Events[]>{
        return this.eventsModel.find();
    }

    async getOneEvent(id: ObjectId): Promise<Events>{
        return this.eventsModel.findById(id)
    }

    async deleteEvent(id: ObjectId): Promise<Events>{
        return this.eventsModel.findByIdAndDelete(id)
    }

}