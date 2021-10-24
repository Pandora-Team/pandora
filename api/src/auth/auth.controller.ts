import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LoginDto, RegisterDto} from "./dto";

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService
    ) {
    }

    @Post('authorization')
    async login(@Body() dto: LoginDto){
        return this.authService.login(dto)
    }

    @Post('registration')
    async register(@Body() dto: RegisterDto){
        return this.authService.register(dto)
    }
}