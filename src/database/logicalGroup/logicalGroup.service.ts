import { Component, Inject } from '@nestjs/common';
import { Repository, TreeRepository } from 'typeorm';
import { LogicalGroup } from './logicalGroup.entity';

@Component()
export class LogicalGroupService {
    constructor(
        @Inject('LogicalGroupRepositoryToken') private readonly logicalGroupRepository: TreeRepository<LogicalGroup>) {}

    async findAll(): Promise<LogicalGroup[]> {
        return await this.logicalGroupRepository.findRoots();
    }
}

