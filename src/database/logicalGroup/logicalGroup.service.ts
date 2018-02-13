import { Component, Inject } from '@nestjs/common';
import { Repository, TreeRepository } from 'typeorm';
import { LogicalGroup } from './logicalGroup.entity';
import { CreateLogicalGroupDto } from './dto/create-logicalGroup.dto';
import { DeleteLogicalGroupDto } from './dto/delete-logicaGroup.dto';
import { TreeRepositoryExt } from '../repository/tree.repository';

@Component()
export class LogicalGroupService {
    constructor(
        @Inject('LogicalGroupRepositoryToken') private readonly logicalGroupRepository: TreeRepositoryExt /*<LogicalGroup>*/) {}

    async findAll(): Promise<LogicalGroup[]> {
        return await this.logicalGroupRepository.findRoots();
    }

    async create(createLogicalGroupDto: CreateLogicalGroupDto)
    {
        let _parent = await this.logicalGroupRepository.findOneById(createLogicalGroupDto.parent);
        let newLogicalGroup = this.logicalGroupRepository.create({ name: createLogicalGroupDto.name, parent: _parent });
        return await this.logicalGroupRepository.save(newLogicalGroup);
    }

    async delete(deleteLogicalGroupDto: DeleteLogicalGroupDto)
    {
        /*
        let logicalGroup = await this.logicalGroupRepository.findByIds([deleteLogicalGroupDto.id]);
        let ancestors = await this.logicalGroupRepository.findAncestors(logicalGroup[0])
        console.log(ancestors);
        */
       let logicalGroup = await this.logicalGroupRepository.findByIds([deleteLogicalGroupDto.id]);
       await this.logicalGroupRepository.removeAncestors(logicalGroup[0]);
       return await this.logicalGroupRepository.removeById(deleteLogicalGroupDto.id);
    }
}

