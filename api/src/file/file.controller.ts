import {
    Post,
    Get,
    Param,
    Res,
    Controller,
    UseInterceptors,
    UploadedFile,
    HttpException,
    HttpStatus,
    Delete
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { FileResponseVm } from './file-response-vm.model'


@Controller('/files')
export class FilesController {

    constructor(private filesService: FileService){}

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file) {
        return {
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            id: file.id,
            filename: file.filename,
            metadata: file.metadata,
            bucketName: file.bucketName,
            chunkSize: file.chunkSize,
            size: file.size,
            md5: file.md5,
            uploadDate: file.uploadDate,
            contentType: file.contentType,
        }
    }

    @Get('info/:id')
    async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED)
        }
        return {
            message: 'File has been detected',
            file: file
        }
    }

    @Get(':id')
    async getFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res)
    }

    @Get('download/:id')
    async downloadFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res)
    }

    @Delete(':id')
    async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.deleteFile(id)
        if(!filestream){
            throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED)
        }
        return {
            message: 'File has been deleted',
            file: file
        }
    }
}