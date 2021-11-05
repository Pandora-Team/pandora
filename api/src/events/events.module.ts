import {Module} from "@nestjs/common";
import {EventsController} from "./events.controller";
import {EventsService} from "./events.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Events, EventsSchema} from "./events.schema";
import {PlacesService} from "../places/places.service";
import {Places, PlacesSchema} from "../places/places.schema";
import {FileService} from "../file/file.service";
import {StatusesService} from "../statuses/statuses.service";
import {Statuses, StatusesSchema} from "../statuses/statuses.schema";
import {UsersService} from "../users/users.service";
import {Users, UsersSchema} from "../users/users.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Events.name, schema: EventsSchema}]),
        MongooseModule.forFeature([{name: Places.name, schema: PlacesSchema}]),
        MongooseModule.forFeature([{name: Statuses.name, schema: StatusesSchema}]),
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
    ],
    controllers: [EventsController],
    providers: [EventsService, PlacesService, FileService, StatusesService, UsersService]
})
export class EventsModule {}