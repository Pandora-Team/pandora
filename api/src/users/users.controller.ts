import {
    Controller,
    Get,
    Param,
    Delete,
    UseGuards,
    Post,
    UseInterceptors,
    UploadedFiles,
    Request
} from "@nestjs/common";
import {ObjectId} from "mongoose";
import {UsersService} from "./users.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) {}

    @Get()
    async getUsers() {
        return this.usersService.getAllUsers()
    }

    @Get("students")
    async getStudents() {
        return this.usersService.getAllStudents()
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.usersService.getUserById(id)
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

    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.usersService.deleteUser(id)
    }

}