import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import {GridFsStorage, UrlStorageOptions} from 'multer-gridfs-storage';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class GridFsService implements MulterOptionsFactory {

    gridFsStorage: UrlStorageOptions;
    constructor(private configService: ConfigService) {
        // @ts-ignore
        this.gridFsStorage = new GridFsStorage({
            url: configService.get<string>('DB_URI'),
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    const filename = file.originalname.trim();
                    const fileInfo = {
                        filename: filename
                    };
                    resolve(fileInfo);
                });
            }
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}