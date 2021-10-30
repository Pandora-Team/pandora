import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Statuses, StatusesDocument} from "./statuses.schema";
import {CreateStatusDto} from "./create-status.dto";

@Injectable()
export class StatusesService {

    constructor(
        @InjectModel(Statuses.name) private statusesModel: Model<StatusesDocument>,
    ) {}

    async getStatuses(eventId: string, userId: string): Promise<Statuses> {
        return this.statusesModel.findOne({event_id: eventId, user_id: userId})
    }

    async createStatuses(userId: string, dto: CreateStatusDto): Promise<Statuses> {
        return this.statusesModel.create({...dto, user_id: userId})
    }

    async updateStatuses(id: ObjectId, dto: CreateStatusDto): Promise<any> {
        return this.statusesModel.updateOne({_id: id}, {...dto})
    }

    async clearStatuses(id: ObjectId): Promise<Statuses> {
        return this.statusesModel.findByIdAndDelete({_id: id})
    }
}