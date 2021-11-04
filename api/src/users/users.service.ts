import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Users, UsersDocument} from "./users.schema";
import {Model, ObjectId} from "mongoose";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private usersModel: Model<UsersDocument>
    ) {}

    async getUser(username: string): Promise<Users | undefined> {
        return this.usersModel.findOne({"username": username})
    }

    async getUserById(id: string): Promise<Users> {
        return this.usersModel.findOne({_id: id})
    }

    async getAllUsers(): Promise<Users[]>{
        return this.usersModel.find()
    }

    async deleteUser(id: ObjectId): Promise<Users>{
        return this.usersModel.findByIdAndDelete(id)
    }

}