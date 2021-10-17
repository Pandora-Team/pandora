import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {PlacesService} from "./places.service";
import {Places, PlacesSchema} from "./places.schema";
import {PlacesController} from "./places.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Places.name, schema: PlacesSchema}])
    ],
    providers: [PlacesService],
    controllers: [PlacesController]
})
export class PlacesModule {}