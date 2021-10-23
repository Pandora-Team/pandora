import {Controller, Post, Get, Param, Body, Delete, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {ObjectId} from "mongoose";
import {CreateEventDto} from "./create-event.dto";
import {EventsService} from "./events.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('events')
export class EventsController {

    constructor(
        private eventsService: EventsService
    ) {
    }

    @Get()
    async getEvents(){
        return this.eventsService.getAllEvents()
    }
    @Get(':id')
    async getEvent(@Param('id') id: ObjectId){
        return this.eventsService.getOneEvent(id)
    }
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cover', maxCount: 1 }
    ]))
    async createEvent(@UploadedFiles() files, @Body() dto: CreateEventDto ){
        const {cover} = files
        return this.eventsService.createEvent(dto, cover[0])
    }
    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.eventsService.deleteEvent(id)
    }
}