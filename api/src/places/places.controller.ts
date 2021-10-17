import {Controller, Get, Param, Delete} from "@nestjs/common";
import {ObjectId} from "mongoose";
import {PlacesService} from "./places.service";


@Controller('places')
export class PlacesController {

    constructor(
        private placesService: PlacesService
    ) {
    }

    @Get()
    async getPlaces(){
        return this.placesService.getAllPlaces()
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.placesService.deletePlace(id)
    }
}