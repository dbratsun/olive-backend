import { Connection, Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogicalGroup } from './logicalGroup.entity';


export const logicalGroupProviders = [
  {
        provide: 'LogicalGroupRepositoryToken',
        useFactory: (connection: Connection) => connection.getTreeRepository(LogicalGroup),
        inject: ['DbConnectionToken'],
  },
];