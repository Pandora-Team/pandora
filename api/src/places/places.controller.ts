import {Controller, Get, Param, Delete, UseGuards} from "@nestjs/common";
import {ObjectId} from "mongoose";
import {PlacesService} from "./places.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";


@Controller('places')
export class PlacesController {

    constructor(
        private placesService: PlacesService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getPlaces(){
        return this.placesService.getAllPlaces()
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.placesService.deletePlace(id)
    }
}