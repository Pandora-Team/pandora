import {Controller, Get, Param, Delete} from "@nestjs/common";
import {ObjectId} from "mongoose";
import {UsersService} from "./users.service";

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

    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.usersService.deleteUser(id)
    }

}