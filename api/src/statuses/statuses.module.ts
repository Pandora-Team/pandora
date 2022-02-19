import {Module, forwardRef} from "@nestjs/common";
import {StatusesController} from "./statuses.controller";
import {StatusesService} from "./statuses.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Statuses, StatusesSchema} from "./statuses.schema";
import {EventsModule} from "../events/events.module";

@Module({
    imports: [
        forwardRef(() => EventsModule),
        MongooseModule.forFeature([{name: Statuses.name, schema: StatusesSchema}]),
    ],
    controllers: [StatusesController],
    providers: [StatusesService],
    exports: [
        StatusesService,
        MongooseModule,
    ]
})
export class StatusesModule {}