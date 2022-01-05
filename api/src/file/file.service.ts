import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { MongoGridFS } from 'mongo-gridfs'
import { GridFSBucketReadStream } from 'mongodb'
import { FileInfoVm } from './file-info-vm.model'

export enum FileType {
    IMAGE = 'image'
}

@Injectable()
export class FileService {
    private fileModel: MongoGridFS;

    constructor(@InjectConnection() private readonly connection: Connection) {
        this.fileModel = new MongoGridFS(this.connection.db, 'fs');
    }

    async readStream(id: string): Promise<GridFSBucketReadStream> {
        return await this.fileModel.readFileStream(id);
    }

    async findInfo(id: string): Promise<FileInfoVm> {
        const result = await this.fileModel
            .findById(id).catch( err => {throw new HttpException('File not found', HttpStatus.NOT_FOUND)} )
            .then(result => result)
        return{
            filename: result.filename,
            length: result.length,
            chunkSize: result.chunkSize,
            md5: result.md5,
            contentType: result.contentType
        }
    }

    async deleteFile(id: string): Promise<boolean>{
        return await this.fileModel.delete(id)
    }

    createFile(type: FileType, file, nameFolder: string): string{
        try {
            const fileExtension = file.originalname.split('.').pop()
            const fileName = uuid.v4() +'.'+ fileExtension
            const filePath = path.resolve(__dirname, '..', `static/${nameFolder}`, type)
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return type + '/' + fileName
        }catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeFile(fileName: string, nameFolder: string) {
        try {
            const filePath = path.resolve(__dirname, '..', `static/${nameFolder}`, fileName)
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}