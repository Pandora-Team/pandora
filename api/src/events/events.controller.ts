import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Put,
    Delete,
    UseInterceptors,
    UseGuards, Request, UploadedFiles
} from "@nestjs/common";
import {ObjectId} from "mongoose";
import {CreateEventData, RecordOnEventData} from "./definitions";
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
    @Get("visited")
    async getVisitedEvent(@Request() req) {
        return this.eventsService.getEventList(req.user.id)
    }


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getEvent(@Param('id') id: ObjectId){
        return this.eventsService.getOneEvent(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('cancel/:id')
    async cancelRecordOnEvent(@Param('id') id: string) {
        return this.eventsService.cancelRecordOnEvent(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post("record")
    async recordOnEvent(@Request() req, @Body() data: RecordOnEventData ) {
        return this.eventsService.recordOnEvent(req.user.id, data)
    }

/*    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cover', maxCount: 1 }
    ]))
    async createEvent(@UploadedFiles() files, @Body() dto: CreateEventData ){
        const {cover} = files
        return this.eventsService.createEvent(dto, cover[0].id)
    }*/

    @UseGuards(JwtAuthGuard)
    @Post("create")
    async createEvent(@Body() dto: CreateEventData ){
        return this.eventsService.createEvent(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('cover/create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cover', maxCount: 1 }
    ]))
    async downloadCover(@UploadedFiles() files){
        const { cover } = files
        return cover[0].id
    }

    @UseGuards(JwtAuthGuard)
    @Delete('cover/remove/:id')
    async removeCover(@Param('id') id: string) {
        return this.eventsService.removeCover(id)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cover', maxCount: 1 }
    ]))
    async updateEvent(@UploadedFiles() files, @Param('id') id: ObjectId, @Body() dto: CreateEventData) {
        const obj = Object.assign({}, files)
        if (Object.keys(obj).length === 0) {
            return this.eventsService.updateEvent(id, dto)
        }
        const {cover} = obj
        return this.eventsService.updateEvent(id, dto, cover[0].id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.eventsService.deleteEvent(id)
    }
}