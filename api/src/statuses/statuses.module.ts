import {Module} from "@nestjs/common";
import {StatusesController} from "./statuses.controller";
import {StatusesService} from "./statuses.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Statuses, StatusesSchema} from "./statuses.schema";
import {Events, EventsSchema} from "../events/events.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Statuses.name, schema: StatusesSchema}]),
        MongooseModule.forFeature([{name: Events.name, schema: EventsSchema}]),
    ],
    controllers: [StatusesController],
    providers: [StatusesService]
})
export class StatusesModule {}