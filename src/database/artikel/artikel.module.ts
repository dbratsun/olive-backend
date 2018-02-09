import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtikelService } from './artikel.service';
import { ArtikelController } from './artikel.controller';
import { Artikel } from './artikel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artikel])],
  components: [ArtikelService],
  controllers: [ArtikelController]
})
export class ArtikelModule {}