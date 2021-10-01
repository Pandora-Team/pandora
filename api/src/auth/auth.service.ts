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

    async login(model: LoginDto) {
        return await this.usersModel.findOne({
            phone: model.phone,
            password: model.pass
        })
            .exec()
            .then(u => {
                const payload = {
                    username: u.phone,
                    role: u.role
                }

                return {
                    access_token: this.jwtService.sign(payload)
                }
            })
            .catch(e => {
                console.log(e)
                return {
                    access_token: "",
                    err: e
                }
            })
    }

    async register(model: RegisterDto){
        return this.usersModel.create({
            name: model.name,
            phone: model.phone,
            password: model.pass
        })
    }
}