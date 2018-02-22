import { EntityRepository } from 'typeorm';
import { TreeRepository } from 'typeorm';
import { TreeRepositoryExt } from "../repository/tree.repository";
import { LogicalGroup } from "./logicalGroup.entity";

@EntityRepository(LogicalGroup)
export class LogicalGroupRepository extends TreeRepositoryExt<LogicalGroup> {

}