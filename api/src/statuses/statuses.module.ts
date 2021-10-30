import {Module} from "@nestjs/common";
import {StatusesController} from "./statuses.controller";
import {StatusesService} from "./statuses.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Statuses, StatusesSchema} from "./statuses.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Statuses.name, schema: StatusesSchema}])
    ],
    controllers: [StatusesController],
    providers: [StatusesService]
})
export class StatusesModule {}