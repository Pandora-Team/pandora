import {
    Controller,
    Get,
    Put,
    Param,
    Delete,
    UseGuards,
    Post,
    UseInterceptors,
    UploadedFiles,
    Request, Body
} from "@nestjs/common";
import {ObjectId} from "mongoose";
import {UsersService} from "./users.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {UpdateUserDto} from "./create-user.dto"

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers() {
        return this.usersService.getAllUsers()
    }

    @UseGuards(JwtAuthGuard)
    @Get("students")
    async getStudents() {
        return this.usersService.getAllStudents()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.usersService.getUserById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('avatar')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 }
    ]))
    async setAvatar(@UploadedFiles() files, @Request() req){
        const { avatar } = files
        return this.usersService.setAvatar(avatar[0], req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.usersService.deleteUser(id)
    }

}