import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Statuses, StatusesDocument} from "./statuses.schema";
import {CreateStatusData} from "./definitions";

@Injectable()
export class StatusesService {

    constructor(
        @InjectModel(Statuses.name) private statusesModel: Model<StatusesDocument>
    ) {}

    async getStatuses(eventId: string, userId: string): Promise<Statuses> {
        return this.statusesModel.findOne({event_id: eventId, user_id: userId})
    }

    async updateStatuses(id: string, dto: CreateStatusData): Promise<any> {
        return this.statusesModel.updateOne({_id: id}, {...dto})
    }

    async createStatus(userId: string, dto: CreateStatusData): Promise<Statuses> {
        return this.statusesModel.create({...dto, user_id: userId})
    }

    async clearStatus(statusId: string): Promise<Statuses> {
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