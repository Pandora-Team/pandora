import {Body, Controller, Post, Get, Request, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LoginDto, RegisterDto} from "./dto";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService
    ) {
    }

    @Post('authorization')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @Post('registration')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}