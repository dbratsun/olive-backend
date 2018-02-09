import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogicalGroup } from './logicalGroup.entity';
import { logicalGroupProviders } from './logicalGroup.providers';
import { LogicalGroupService } from './logicalGroup.service';
import { DatabaseModule } from '../database.module';
import { LogicalGroupController } from './logicalGroup.controller';

@Module({
  imports: [DatabaseModule],
  components: [
    ...logicalGroupProviders,
    LogicalGroupService,
  ],
  controllers: [LogicalGroupController]
})
export class LogicalGroupModule {}