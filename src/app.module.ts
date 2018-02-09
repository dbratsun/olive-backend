import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { ArtikelModule } from './database/artikel/artikel.module';
import { ArtikelController } from './database/artikel/artikel.controller';
import { UnitModule } from './database/unit/unit.module';
import { UnitController } from './database/unit/unit.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), ArtikelModule, UnitModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
