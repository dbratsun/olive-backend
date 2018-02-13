import { Connection, Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogicalGroup } from './logicalGroup.entity';
import { TreeRepositoryExt } from '../repository/tree.repository';


export const logicalGroupProviders = [
  {
        provide: 'LogicalGroupRepositoryToken',
        useFactory: (connection: Connection) => connection.getCustomRepository(TreeRepositoryExt),
        // getTreeRepository(LogicalGroup),
        inject: ['DbConnectionToken'],
  },
];