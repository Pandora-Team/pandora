import {Body, Controller, Post, Get, Request, UseGuards, Res} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LoginDto, RegisterDto} from "./dto";
import {Response} from "express";
import {JwtAuthGuard} from "./jwt-auth.guard";
import * as dayjs from 'dayjs';

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {
    }

    @Post('authorization')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
        const res = await this.authService.login(dto)
        const date = dayjs().add(1, "year").format()
        response.cookie('at', res.access_token, {httpOnly: true, expires: new Date(date)})
        return res._id
    }

    @Post('registration')
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) response: Response) {
        const res = await this.authService.register(dto)
        const date = dayjs().add(1, "year").format()
        response.cookie('at', res.access_token, {httpOnly: true, expires: new Date(date)})
        return res._id
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.authService.getProfile(req)
    }

    @Get('check')
    checkUser(@Request() req) {
        return this.authService.checkUser(req)
    }

    @Get('logout')
    logout(@Res({ passthrough: true }) response: Response) {
        const date = dayjs().subtract(1, "day").format()
        response.cookie("at", "", {maxAge: -1, expires: new Date(date)})
        return true
    }
}