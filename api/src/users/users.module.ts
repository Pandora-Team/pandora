import {forwardRef, Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Users, UsersSchema} from "./users.schema";
import {FileModule} from "../file/file.module";
import {EventsModule} from "../events/events.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
        FileModule,
        forwardRef(() => EventsModule),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [
        UsersService,
        MongooseModule,
    ]
})
export class UsersModule {}