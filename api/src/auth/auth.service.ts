import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectModel} from "@nestjs/mongoose";
import {Users, UsersDocument} from "../users/users.schema";
import {Model} from "mongoose";
import {UsersService} from "../users/users.service";
import {LoginDto, RegisterDto} from "./dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectModel(Users.name) private usersModel: Model<UsersDocument>
    ) {}

    async validateUser(name: string, pass: string): Promise<any> {
        const user = await this.usersService.getUser(name)
        if(user && user.pass === pass) {
            const { pass, ...result } = user
            return result
        }
        return null
    }

    async login(dto: LoginDto) {
        const user = await this.usersModel.findOne({...dto})

        if (!user) {
            return { error: true }
        }

        const payload = {
            _id: user._id,
            name: user.name,
            role: user.role
        }
        return {
            access_token: this.jwtService.sign(payload),
            ...payload
        }
    }

    async register(dto: RegisterDto) {
        if(!dto.role){
            dto.role = "dancer"
        }
        const newUser = await this.usersModel.create({...dto})

        if (!newUser) {
            return { error: true }
        }

        const payload = {
            _id:  newUser._id,
            name: newUser.name,
            role: newUser.role
        }
        return {
            access_token: this.jwtService.sign(payload),
            ...payload
        }
    }
}