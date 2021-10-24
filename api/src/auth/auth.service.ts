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

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(username)
        if(user && user.password === password) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(dto: LoginDto) {
        const user = await this.usersModel.findOne({...dto})
        if (!user) {
            return { access_token: "" }
        }

        const payload = {
            name: user.name,
            role: user.role
        }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(dto: RegisterDto): Promise<Users> {
        if(!dto.role){
            dto.role = "dancer"
        }
        return this.usersModel.create({...dto})
    }
}