import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Unit } from './unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUnitDto } from './dto/create-unit.dto';

@Component()
export class UnitService {
    constructor(@InjectRepository(Unit) private readonly unitRepository: Repository<Unit>) {}

    async findAll(): Promise<Unit[]> {
        return await this.unitRepository.find();
    }

    async findAllFull(): Promise<Unit[]> {
        return await this.unitRepository.find({relations: ["artikels"]});
    }

    async create(createUnitDto: CreateUnitDto): Promise<Unit> {
        let newUnit =  this.unitRepository.create(createUnitDto);
        return await this.unitRepository.save(newUnit);
    }
}

