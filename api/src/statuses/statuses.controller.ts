import {Body, Controller, Put, Get, Param, Post, Request, UseGuards, Delete} from "@nestjs/common"
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

    @UseGuards(JwtAuthGuard)
    @Post()
    async setStatuses(@Request() req, @Body() dto: CreateStatusDto) {
        return this.statusesService.createStatuses(req.user.id, dto)
    }

    @Put(':id')
    async updateStatuses(@Param('id') id: ObjectId, @Body() dto: CreateStatusDto) {
        return this.statusesService.updateStatuses(id, dto)
    }

    @Delete(':id')
    async clearStatuses(@Param('id') id: ObjectId) {
        return this.statusesService.clearStatuses(id)
    }

}