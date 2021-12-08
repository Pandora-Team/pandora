import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Users, UsersDocument} from "./users.schema";
import {Model, ObjectId} from "mongoose";
import {FileService, FileType} from "../file/file.service";
import {UpdateUserDto} from "./create-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
        private fileService: FileService,
    ) {}

    async getUserById(id: string): Promise<Users> {
        return this.usersModel.findOne({_id: id}, {pass: 0, phone: 0})
    }

    async getAllUsers(): Promise<Users[]> {
        return this.usersModel.find({}, {pass: 0})
    }

    async getAllStudents(): Promise<Users[]> {
        return this.usersModel.find({role: "dancer"}, {pass: 0})
    }

    async updateUser(id: string, dto: UpdateUserDto): Promise<any> {
        return this.usersModel.updateOne({_id: id}, {$set: {...dto}})
    }

    async setAvatar(avatar, id): Promise<any> {
        const nameFolder = "users"
        const user = await this.getUserById(id)
        if (user.avatar) {
            this.fileService.removeFile(user.avatar, nameFolder)
        }
        const avatarPath = this.fileService.createFile(FileType.IMAGE, avatar, nameFolder)
        await this.usersModel.updateOne({_id: id}, {avatar: avatarPath})
        return avatarPath
    }

    async deleteUser(id: ObjectId): Promise<Users>{
        return this.usersModel.findByIdAndDelete({_id: id})
    }

}