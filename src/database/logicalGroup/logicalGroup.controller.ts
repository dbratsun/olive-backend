import { Controller, Get } from '@nestjs/common';
import { LogicalGroupService } from './logicalGroup.service';
import { LogicalGroup } from './logicalGroup.entity';

@Controller('logicalgroup')
export class ArtikelController {
    constructor (private readonly logicalGroupService: LogicalGroupService) {}

    @Get()
    findAll(): Promise<LogicalGroup[]> {
        return this.logicalGroupService.findAll();
    }
}