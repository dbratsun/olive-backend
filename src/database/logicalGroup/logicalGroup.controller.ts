import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { LogicalGroupService } from './logicalGroup.service';
import { LogicalGroup } from './logicalGroup.entity';
import { CreateLogicalGroupDto } from './dto/create-logicalGroup.dto';
import { DeleteLogicalGroupDto } from './dto/delete-logicaGroup.dto';

@Controller('logicalgroup')
export class LogicalGroupController {
    constructor (private readonly logicalGroupService: LogicalGroupService) {}

    @Get()
    findAll(): Promise<LogicalGroup[]> {
        return this.logicalGroupService.findAll();
    }
    
    @Post()
    async create(@Body() createLogicalGroupDto: CreateLogicalGroupDto): Promise<LogicalGroup> {
        console.log(createLogicalGroupDto);
        return this.logicalGroupService.create(createLogicalGroupDto);
    }

    @Delete()
    async delete(@Body() deleteLogicalGroupDto: DeleteLogicalGroupDto): Promise<void> {
        return this.logicalGroupService.delete(deleteLogicalGroupDto);
    }

}    