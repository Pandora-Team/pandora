import {Injectable} from "@nestjs/common";
import {Model, ObjectId} from "mongoose";
import {Places, PlacesDocument} from "./places.schema";
import {InjectModel} from "@nestjs/mongoose";
import {CreatePlaceDto} from "./create-place.dto";

@Injectable()
export class PlacesService {
    constructor(
        @InjectModel(Places.name) private placesModel: Model<PlacesDocument>,
    ) {}

    async createPlace(dto: CreatePlaceDto): Promise<Places>{
        const { address } = dto
        const res = await this.placesModel.findOne({address: address})
        if (res?.address) return res
        return await this.placesModel.create(dto)
    }

    async getOnePlace(id: string): Promise<Places>{
        return this.placesModel.findOne({_id: id})
    }

    async getAllPlaces(): Promise<Places[]> {
        return this.placesModel.find()
    }

    async deletePlace(id: ObjectId): Promise<Places>{
        return this.placesModel.findByIdAndDelete(id)
    }

}