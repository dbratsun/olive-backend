import { Controller, Get } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from './unit.entity';

@Controller('unit')
export class UnitController {
    constructor (private readonly unitService: UnitService) {}

    @Get()
    findAll(): Promise<Unit[]> {
        return this.unitService.findAll();
    }

    @Get('unitfull')
    findAllFull(): Promise<Unit[]> {
        return this.unitService.findAllFull();
    }
}

