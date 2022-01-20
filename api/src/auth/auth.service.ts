import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectModel} from "@nestjs/mongoose";
import {Users, UsersDocument} from "../users/users.schema";
import {Model} from "mongoose";
import {UsersService} from "../users/users.service";
import {LoginDto, RegisterDto} from "./dto";
import * as dayjs from 'dayjs'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectModel(Users.name) private usersModel: Model<UsersDocument>
    ) {}

    async login(dto: LoginDto) {
        const user = await this.usersModel.findOne({...dto})

        if (!user) {
            throw new Error("Error User Login")
        }

        const date = dayjs().format()
        await this.usersModel.updateOne({_id: user._id}, {"visit_date": date})

        const payload = {
            _id: user._id,
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
        const date = dayjs().format()
        dto.reg_date = date
        dto.visit_date = date

        const oldUser = await this.usersModel.findOne({phone: dto.phone})
        if (oldUser) {
            throw new Error("User registered")
        }

        const newUser = await this.usersModel.create({...dto})

        if (!newUser) {
            throw new Error("Error User Register")
        }

        const payload = {
            _id:  newUser._id,
        }
        return {
            access_token: this.jwtService.sign(payload),
            ...payload
        }
    }

    async getProfile(req) {
        const date = dayjs().format()
        await this.usersModel.updateOne({_id: req.user.id}, {"visit_date": date})
        return req.user;
    }

    async checkUser(req) {
        const jwt = req.cookies.at
        if (!jwt) return false
        try {
            const check = this.jwtService.verify(jwt)
            return check._id
        } catch (e) {
            return false
        }
    }
}