import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Statuses, StatusesDocument} from "./statuses.schema";
import {CreateStatusDto} from "./create-status.dto";
import {Events, EventsDocument} from "../events/events.schema";

@Injectable()
export class StatusesService {

    constructor(
        @InjectModel(Statuses.name) private statusesModel: Model<StatusesDocument>,
        @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
    ) {}

    async getStatuses(eventId: string, userId: string): Promise<Statuses> {
        return this.statusesModel.findOne({event_id: eventId, user_id: userId})
    }

    async createStatuses(userId: string, dto: CreateStatusDto): Promise<Statuses> {
        const status = await this.statusesModel.create({...dto, user_id: userId})
        if (status) {
            await this.eventsModel.updateOne({_id: dto.event_id}, {$addToSet: {users_id: userId}})
        }
        return status
    }

    async updateStatuses(id: ObjectId, dto: CreateStatusDto): Promise<any> {
        return this.statusesModel.updateOne({_id: id}, {...dto})
    }

    async clearStatuses(statusId: string): Promise<Statuses> {
        const status = await this.statusesModel.findByIdAndDelete({_id: statusId})
        if (status) {
            await this.eventsModel.updateOne({_id: status.event_id}, {$pull: {users_id: status.user_id}})
        }
        return status
    }

    async clearStatusesAllUsers(eventId: string): Promise<void> {
        const statuses = await this.statusesModel.find({event_id: eventId})
        console.log("[statuses] - ", statuses)
        if (statuses.length) {
            for (let i = 0; i < statuses.length; i++) {
                const status = await this.statusesModel.findByIdAndDelete({_id: statuses[i]._id})
                console.log("[status] - ", status)
            }
        }
    }

}