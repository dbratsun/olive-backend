import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Artikel } from './artikel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Component()
export class ArtikelService {
    constructor(@InjectRepository(Artikel) private readonly artikelRepository: Repository<Artikel>) {}

    async findAll(): Promise<Artikel[]> {
        return await this.artikelRepository.find({relations: ["unit"]});
    }
}