import {Controller, Post, Get, Param, Body, Delete} from "@nestjs/common";
import {ObjectId} from "mongoose";
import {CreateEventDto} from "./create-event.dto";
import {EventsService} from "./events.service";

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
    async createEvent( @Body() dto: CreateEventDto ){
        return this.eventsService.createEvent(dto)
    }
    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.eventsService.deleteEvent(id)
    }
}