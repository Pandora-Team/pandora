import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {RegisterDto} from "./dto";

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService
    ) {
    }

    @Post('login')
    async login(@Body() model){
        return this.authService.login(model)
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