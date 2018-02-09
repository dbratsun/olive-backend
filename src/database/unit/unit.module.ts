import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
// import { unitProviders } from './unit.providers';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  components: [UnitService],
  controllers: [UnitController]
})
export class UnitModule {}