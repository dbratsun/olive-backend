import { Connection, Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogicalGroup } from './logicalGroup.entity';
import { TreeRepositoryExt } from '../repository/tree.repository';
import { LogicalGroupRepository } from './logicalGroup.repository';


export const logicalGroupProviders = [
  {
        provide: 'LogicalGroupRepositoryToken',
        useFactory: (connection: Connection) => connection.getCustomRepository(LogicalGroupRepository),
        // useFactory: (connection: Connection) => connection.getTreeRepository(LogicalGroup),
        inject: ['DbConnectionToken'],
  },
];