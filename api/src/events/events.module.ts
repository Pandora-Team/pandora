import {Module} from "@nestjs/common";
import {EventsController} from "./events.controller";
import {EventsService} from "./events.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Events, EventsSchema} from "./events.schema";
import {StatusesService} from "../statuses/statuses.service";
import {Statuses, StatusesSchema} from "../statuses/statuses.schema";
import {UsersService} from "../users/users.service";
import {Users, UsersSchema} from "../users/users.schema";
import {PlacesModule} from "../places/places.module";
import {FileModule} from "../file/file.module";

@Module({
    imports: [
        FileModule,
        PlacesModule,
        MongooseModule.forFeature([{name: Events.name, schema: EventsSchema}]),
        MongooseModule.forFeature([{name: Statuses.name, schema: StatusesSchema}]),
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
    ],
    controllers: [EventsController],
    providers: [
        EventsService,
        StatusesService,
        UsersService,
    ]
})
export class EventsModule {}