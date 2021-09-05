import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectModel} from "@nestjs/mongoose";
import {Users, UsersDocument} from "../users/users.schema";
import {Model} from "mongoose";
import {UsersService} from "../users/users.service";

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

    async login(user: any) {
        const payload = { username: user.username }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}