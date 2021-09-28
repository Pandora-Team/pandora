import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Users, UsersDocument} from "./users.schema";
import {Model, ObjectId} from "mongoose";
import {CreateUserDto} from "./create-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private usersModel: Model<UsersDocument>
    ) {}

    async createUser(dto: CreateUserDto): Promise<Users>{
        if(!dto.role){
            dto.role = 'dancer'
        }
        return this.usersModel.create({...dto})
    }

    async getUser(username: string): Promise<Users | undefined> {
        return this.usersModel.findOne({"username": username})
    }

    async getUserById(id: ObjectId): Promise<Users> {
        return this.usersModel.findById(id)
    }

    async getAllUsers(): Promise<Users[]>{
        return this.usersModel.find()
    }

    async deleteUser(id: ObjectId): Promise<Users>{
        return this.usersModel.findByIdAndDelete(id)
    }

}