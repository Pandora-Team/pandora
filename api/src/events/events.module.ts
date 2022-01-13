import {Module} from "@nestjs/common";
import {EventsController} from "./events.controller";
import {EventsService} from "./events.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Events, EventsSchema} from "./events.schema";
import {PlacesModule} from "../places/places.module";
import {FileModule} from "../file/file.module";
import {StatusesModule} from "../statuses/statuses.module";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        FileModule,
        PlacesModule,
        StatusesModule,
        UsersModule,
        MongooseModule.forFeature([{name: Events.name, schema: EventsSchema}]),
    ],
    controllers: [EventsController],
    providers: [EventsService],
})
export class EventsModule {}