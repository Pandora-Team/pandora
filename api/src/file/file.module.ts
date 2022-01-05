import {Module} from "@nestjs/common";
import {FileService} from "./file.service";
import { MulterModule } from '@nestjs/platform-express';
import {GridFsService} from "./gridfs.service";
import {FilesController} from "./file.controller";

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: GridFsService,
        }),
    ],
    controllers: [FilesController],
    providers: [FileService , GridFsService]
})

export class FileModule{}