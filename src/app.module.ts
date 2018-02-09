import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { ArtikelModule } from './database/artikel/artikel.module';
import { ArtikelController } from './database/artikel/artikel.controller';
import { UnitModule } from './database/unit/unit.module';
import { UnitController } from './database/unit/unit.controller';
import { LogicalGroupModule } from './database/logicalGroup/logicalGroup.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TypeOrmModule.forRoot(), DatabaseModule, ArtikelModule, UnitModule, LogicalGroupModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
