import {Injectable, Inject, forwardRef} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Statuses, StatusesDocument} from "./statuses.schema";
import {CreateStatusDto} from "./create-status.dto";
import {EventsService} from "../events/events.service";

@Injectable()
export class StatusesService {

    constructor(
        @InjectModel(Statuses.name) private statusesModel: Model<StatusesDocument>,
        @Inject(forwardRef(() => EventsService))
        private eventsService: EventsService
    ) {}

    async getStatuses(eventId: string, userId: string): Promise<Statuses> {
        return this.statusesModel.findOne({event_id: eventId, user_id: userId})
    }

    async createStatuses(userId: string, dto: CreateStatusDto): Promise<Statuses> {
        const status = await this.statusesModel.create({...dto, user_id: userId})
        if (status) {
            await this.eventsService.addUserToEvent(dto.event_id, userId)
        }
        return status
    }

    async updateStatuses(id: ObjectId, dto: CreateStatusDto): Promise<any> {
        return this.statusesModel.updateOne({_id: id}, {...dto})
    }

    async clearStatuses(statusId: string): Promise<Statuses> {
        const status = await this.statusesModel.findByIdAndDelete({_id: statusId})
        if (status) {
            await this.eventsService.removeUserFromEvent(status.event_id, status.user_id)
        }
        return status
    }

    async clearStatusAtCancel(statusId: string) {
        return this.statusesModel.findByIdAndDelete({_id: statusId})
    }

    async clearStatusesAllUsers(eventId: string): Promise<void> {
        const statuses = await this.statusesModel.find({event_id: eventId})
        if (statuses.length) {
            for (let i = 0; i < statuses.length; i++) {
                await this.statusesModel.findByIdAndDelete({_id: statuses[i]._id})
            }
        }
    }

}