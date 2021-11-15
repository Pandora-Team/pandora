import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Users, UsersDocument} from "./users.schema";
import {Model, ObjectId} from "mongoose";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private usersModel: Model<UsersDocument>
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

    async deleteUser(id: ObjectId): Promise<Users>{
        return this.usersModel.findByIdAndDelete({_id: id})
    }

}