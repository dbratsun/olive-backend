import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Unit } from '../unit/unit.entity';

@Entity()
export class Artikel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @ManyToOne(type => Unit, unit => unit.artikels)
  unit: Unit;
}