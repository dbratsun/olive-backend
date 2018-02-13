import { Controller, Get } from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { Artikel } from './artikel.entity';

@Controller('artikel')
export class ArtikelController {
    constructor (private readonly artikelService: ArtikelService) {}

    @Get()
    findAll(): Promise<Artikel[]> {
        return this.artikelService.findAll();
    }
    
}