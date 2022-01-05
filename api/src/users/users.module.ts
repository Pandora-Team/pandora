import {Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Users, UsersSchema} from "./users.schema";
import {FileService} from "../file/file.service";
import {MulterModule} from "@nestjs/platform-express";
import {GridFsService} from "../file/gridfs.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
        MulterModule.registerAsync({
            useClass: GridFsService,
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, FileService, GridFsService],
    exports: [UsersService]
})
export class UsersModule {}