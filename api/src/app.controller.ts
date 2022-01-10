import { Connection } from 'mongoose'
import {Controller, Get, HttpStatus, Res} from "@nestjs/common";
import {InjectConnection} from "@nestjs/mongoose";
import {Response} from "express";

@Controller()
export class AppController {

    constructor(@InjectConnection() private readonly connection: Connection) {
    }

    @Get('health')
    async checkBD(@Res() response: Response) {
        try {
            const db = this.connection.db
            response.status(HttpStatus.OK).send({db: db.databaseName})
        } catch (e) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }

}