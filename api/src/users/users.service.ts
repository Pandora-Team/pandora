import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Users, UsersDocument} from "./users.schema";
import {Model, ObjectId} from "mongoose";
import {FileService} from "../file/file.service";
import {UpdateUserDto} from "./create-user.dto";
import {EventsService} from "../events/events.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
        private fileService: FileService,
        //private eventService: EventsService,
    ) {}

    async getUserById(id: string): Promise<Users> {
        return this.usersModel.findOne({_id: id}, {pass: 0, phone: 0})
    }

    async getAllUsers(): Promise<Users[]> {
        return this.usersModel.find({}, {pass: 0})
    }

    async getAllStudents(): Promise<Users[]> {
        let users = await this.usersModel.find({role: "dancer"}, {pass: 0})
        return Promise.all(users.map(async user => {
            //user.events = await this.eventService.getEventListForUser(user._id)
            return user
        }))
    }

    async updateUser(id: string, dto: UpdateUserDto): Promise<any> {
        return this.usersModel.updateOne({_id: id}, {$set: {...dto}})
    }

    async setAvatar(avatarId, id): Promise<string> {
        const user = await this.getUserById(id)
        if (user.avatar) {
            await this.fileService.deleteFile(user.avatar)
        }
        await this.usersModel.updateOne({_id: id}, {avatar: avatarId})
        return avatarId
    }

    async deleteUser(id: ObjectId): Promise<Users>{
        return this.usersModel.findByIdAndDelete({_id: id})
    }

}