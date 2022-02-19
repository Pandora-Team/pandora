import {Body, Controller, Put, Get, Param, Request, UseGuards} from "@nestjs/common"
import {StatusesService} from "./statuses.service"
import {JwtAuthGuard} from "../auth/jwt-auth.guard"
import {CreateStatusDto} from "./create-status.dto"
import {ObjectId} from "mongoose";

@Controller('statuses')
export class StatusesController {

    constructor(
        private statusesService: StatusesService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getStatuses(@Param('id') id: string, @Request() req) {
        return this.statusesService.getStatuses(id, req.user.id)
    }

   /* @UseGuards(JwtAuthGuard)
    @Post()
    async setStatuses(@Request() req, @Body() dto: CreateStatusDto) {
        return this.statusesService.createStatuses(req.user.id, dto)
    }*/

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateStatuses(@Param('id') id: ObjectId, @Body() dto: CreateStatusDto) {
        return this.statusesService.updateStatuses(id, dto)
    }

    /*@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async clearStatuses(@Param('id') id: string) {
        return this.statusesService.clearStatuses(id)
    }*/

}