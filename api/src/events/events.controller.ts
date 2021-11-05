import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Put,
    Delete,
    UploadedFiles,
    UseInterceptors,
    UseGuards, Request
} from "@nestjs/common";
import {ObjectId} from "mongoose";
import {CreateEventDto} from "./create-event.dto";
import {EventsService} from "./events.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('events')
export class EventsController {

    constructor(
        private eventsService: EventsService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getEvents(@Request() req){
        return this.eventsService.getAllEvents(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("list")
    async getEventsWithStudents(){
        return this.eventsService.getAllEventsWithStudents()
    }

    @UseGuards(JwtAuthGuard)
    @Get("nearest")
    async getNearestEvent(@Request() req){
        return this.eventsService.getNearestEvent(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getEvent(@Param('id') id: ObjectId){
        return this.eventsService.getOneEvent(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cover', maxCount: 1 }
    ]))
    async createEvent(@UploadedFiles() files, @Body() dto: CreateEventDto ){
        const {cover} = files
        return this.eventsService.createEvent(dto, cover[0])
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateEvent(@Param('id') id: ObjectId, @Body() dto: CreateEventDto) {
        return this.eventsService.updateEvent(id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.eventsService.deleteEvent(id)
    }
}