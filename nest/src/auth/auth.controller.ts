import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {RegisterDto} from "./register.dto";

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth')
    async login(@Request() req){
        return this.authService.login(req.user._doc)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('register')
    async register(@Body() model: RegisterDto){
        return this.authService.register(model)
    }
}