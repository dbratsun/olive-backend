import { Controller, Get, Post, Body } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from './unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';

@Controller('unit')
export class UnitController {
    constructor (private readonly unitService: UnitService) {}

    @Get()
    async findAll(): Promise<Unit[]> {
        return this.unitService.findAll();
    }

    @Get('unitfull')
    async findAllFull(): Promise<Unit[]> {
        return this.unitService.findAllFull();
    }

    @Post()
    async create(@Body() createUnitDto: CreateUnitDto): Promise<Unit> {
        return this.unitService.create(createUnitDto);
    }
}

