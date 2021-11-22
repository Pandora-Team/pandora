import {Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Users, UsersSchema} from "./users.schema";
import {FileService} from "../file/file.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
    ],
    controllers: [UsersController],
    providers: [UsersService, FileService],
    exports: [UsersService]
})
export class UsersModule {}