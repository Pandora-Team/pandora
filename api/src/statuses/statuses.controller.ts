import {Body, Controller, Put, Param, UseGuards} from "@nestjs/common"
import {StatusesService} from "./statuses.service"
import {JwtAuthGuard} from "../auth/jwt-auth.guard"
import {CreateStatusData} from "./definitions"

@Controller('statuses')
export class StatusesController {

    constructor(
        private statusesService: StatusesService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateStatuses(@Param('id') id: string, @Body() dto: CreateStatusData) {
        return this.statusesService.updateStatuses(id, dto)
    }
}