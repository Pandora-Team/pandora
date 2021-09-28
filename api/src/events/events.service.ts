import {Injectable} from "@nestjs/common";
import {Model, ObjectId} from "mongoose";
import {Events, EventsDocument} from "./events.schema";
import {InjectModel} from "@nestjs/mongoose";
import {CreateEventDto} from "./create-event.dto";

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
    ) {}

    async createEvent(dto: CreateEventDto): Promise<Events>{
        return this.eventsModel.create({...dto})
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