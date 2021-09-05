import {Controller, Post, Get, Param, Body, Delete, UseGuards, Request} from "@nestjs/common";
import {CreateUserDto} from "./create-user.dto";
import {ObjectId} from "mongoose";
import {UsersService} from "./users.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) {
    }

    @Get()
    async getUsers(){
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    async getUser(@Param('id') id: ObjectId) {
        return this.usersService.getUserById(id)
    }

    @Post('create')
    async createUser(@Body() dto: CreateUserDto){
        return this.usersService.createUser(dto)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.usersService.deleteUser(id)
    }

}