import {Column, PrimaryGeneratedColumn, ClosureEntity, TreeParent, TreeChildren, TreeLevelColumn } from 'typeorm';

@ClosureEntity("logicalGroup")
export class LogicalGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @TreeParent()
    parent: LogicalGroup;

    @TreeChildren({cascadeInsert: true, cascadeUpdate: true})
    childs: LogicalGroup[];

    @TreeLevelColumn()
    level: number;
}