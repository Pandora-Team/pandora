import {Module} from "@nestjs/common";
import {EventsController} from "./events.controller";
import {EventsService} from "./events.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Events, EventsSchema} from "./events.schema";
import {UsersService} from "../users/users.service";
import {Users, UsersSchema} from "../users/users.schema";
import {PlacesModule} from "../places/places.module";
import {FileModule} from "../file/file.module";
import {StatusesModule} from "../statuses/statuses.module";

@Module({
    imports: [
        FileModule,
        PlacesModule,
        StatusesModule,
        MongooseModule.forFeature([{name: Events.name, schema: EventsSchema}]),
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
    ],
    controllers: [EventsController],
    providers: [
        EventsService,
        UsersService,
    ],
    exports: [EventsService]
})
export class EventsModule {}