import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Artikel } from '../artikel/artikel.entity';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 3 })
  shortname: string;

  @Column({ length: 500 })
  name: string;

  @OneToMany(type => Artikel, artikel => artikel.unit)
  artikels: Artikel[]
}