import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Unit } from './unit.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Component()
export class UnitService {
    constructor(@InjectRepository(Unit) private readonly unitRepository: Repository<Unit>) {}

    async findAll(): Promise<Unit[]> {
        return await this.unitRepository.find();
    }


    async findAllFull(): Promise<Unit[]> {
        return await this.unitRepository.find({relations: ["artikels"]});
    }
}