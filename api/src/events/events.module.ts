import {Module} from "@nestjs/common";
import {EventsController} from "./events.controller";
import {EventsService} from "./events.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Events, EventsSchema} from "./events.schema";
import {PlacesService} from "../places/places.service";
import {Places, PlacesSchema} from "../places/places.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Events.name, schema: EventsSchema}]),
        MongooseModule.forFeature([{name: Places.name, schema: PlacesSchema}])
    ],
    controllers: [EventsController],
    providers: [EventsService, PlacesService]
})
export class EventsModule {}