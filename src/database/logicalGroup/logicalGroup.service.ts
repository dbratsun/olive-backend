import { LogicalGroupRepository } from './logicalGroup.repository';
import { Component, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, TreeRepository } from 'typeorm';
import { LogicalGroup } from './logicalGroup.entity';
import { CreateLogicalGroupDto } from './dto/create-logicalGroup.dto';
import { DeleteLogicalGroupDto } from './dto/delete-logicaGroup.dto';
import { TreeRepositoryExt } from '../repository/tree.repository';

@Component()
export class LogicalGroupService {
    constructor(
        @Inject('LogicalGroupRepositoryToken') private readonly logicalGroupRepository: LogicalGroupRepository/*<LogicalGroup>*/) {}

    async findAll(): Promise<LogicalGroup[]> {
        return await this.logicalGroupRepository.findRoots();
    }

    async create(createLogicalGroupDto: CreateLogicalGroupDto)
    {
        let _parent = await this.logicalGroupRepository.findOneById(createLogicalGroupDto.parent);
        let newLogicalGroup = this.logicalGroupRepository.create({ name: createLogicalGroupDto.name, parent: _parent });
        console.log(newLogicalGroup);
        return await this.logicalGroupRepository.save(newLogicalGroup);
    }

    async delete(deleteLogicalGroupDto: DeleteLogicalGroupDto): Promise<void>
    {
        await this.logicalGroupRepository.findByIds([deleteLogicalGroupDto.id])
                .then (entities => {
                    if (entities.length > 0) {
                        console.log(entities.length);
                        this.logicalGroupRepository.removeById(deleteLogicalGroupDto.id);           
                    }
                    else {
                        throw new HttpException(`${deleteLogicalGroupDto.id} is not valid id, logical group not exist`, HttpStatus.NOT_FOUND)
                    }
                })
    }
}

