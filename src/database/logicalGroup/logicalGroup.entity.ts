import {Column, PrimaryGeneratedColumn, ClosureEntity, TreeParent, TreeChildren, TreeLevelColumn } from 'typeorm';

@ClosureEntity()
export class LogicalGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name1: string;

    @TreeParent()
    parent: LogicalGroup;

    @TreeChildren({cascadeInsert: true, cascadeUpdate: true})
    childs: LogicalGroup[];

    @TreeLevelColumn()
    level: number;
}