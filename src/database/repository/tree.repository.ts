import { TreeRepository, RemoveOptions, DeleteQueryBuilder, EntityRepository, SelectQueryBuilder } from "typeorm";
import { LogicalGroup } from "../logicalGroup/logicalGroup.entity";

// for delete/move logic
// s. https://github.com/typeorm/typeorm/issues/193 Remove entity from TreeRepository (Closure table)
// s. also http://www.waitingforcode.com/mysql/managing-hierarchical-data-in-mysql-closure-table/read
// s. https://www.slideshare.net/billkarwin/models-for-hierarchical-data


export class TreeRepositoryExt<Entity> extends TreeRepository<Entity> {

    async removeAncestors(id: any): Promise<void> {
    }

    async removeDescendants() {

    }

    async removeById(id: any, options?: RemoveOptions): Promise<void> {
        const escapeColumn = (column: string) => this.manager.connection.driver.escape(column);
        await this
            .createQueryBuilder()
            .delete()
            .from(this.metadata.closureJunctionTable.tableName)
            // .where(`${escapeAlias("treeClosure")}.${escapeColumn("descendant")}=${this.metadata.getEntityIdMap(entity)![this.metadata.primaryColumns[0].propertyName]}`)            
            // .where(`${this.metadata.closureJunctionTable.tableName}.${escapeColumn("descendant")}=${this.metadata.getEntityIdMap(entity)![this.metadata.primaryColumns[0].propertyName]}`)
            .where(`${this.metadata.closureJunctionTable.tableName}.${escapeColumn("descendant")}=${id}`)
            .orWhere(`${this.metadata.closureJunctionTable.tableName}.${escapeColumn("ancestor")}=${id}`)
            .printSql()
            .execute();

        const entity = await this.findOneById(id);    
        /*    
        const ids: any[] = await this.findDescendants(entity);
        console.log("list of ids:")
        console.log(ids);
        */

        const qb = await this
            .createAncestorsQueryBuilder("treeEntity", "treeClosure", entity)
            .select(`${escapeColumn("treeClosure")}.${escapeColumn("descendant")}`)
            .where(`${escapeColumn("treeClosure")}.${escapeColumn("ancestor")}=${id}`)

        const qb1 = await this
            .createAncestorsQueryBuilder("treeEntity", "treeClosure", entity)
            .select(`${escapeColumn("treeClosure")}.${escapeColumn("descendant")}`)
            .where(`${escapeColumn("treeClosure")}.${escapeColumn("ancestor")}=${id}`)
            .printSql()
            .getMany();

        console.log(qb1);

        await this
            .createQueryBuilder()
            .delete()
            .from(this.metadata.tableName)
            .where(`${this.metadata.tableName}.${escapeColumn("id")}=${id}`)
            .orWhere("id in (" + qb.getQuery() + ")")
            .printSql()
            .execute();

        return super.removeById(id, options);
    }

    findAncestorsExt(entity: Entity): Promise<Entity[]> {
        return this
            .createAncestorsQueryBuilderExt("treeEntity", "treeClosure", entity)
            .printSql()
            .getMany();
    }

    createAncestorsQueryBuilderExt(alias: string, closureTableAlias: string, entity: Entity): SelectQueryBuilder<Entity> {

        // create shortcuts for better readability
        const escapeAlias = (alias: string) => this.manager.connection.driver.escape(alias);
        const escapeColumn = (column: string) => this.manager.connection.driver.escape(column);

        const joinCondition = `${escapeAlias(alias)}.${escapeColumn(this.metadata.primaryColumns[0].databaseName)}=${escapeAlias(closureTableAlias)}.${escapeColumn("ancestor")}`;
        return this.createQueryBuilder(alias)
            .innerJoin(this.metadata.closureJunctionTable.tableName, closureTableAlias, joinCondition)
            .where(`${escapeAlias(closureTableAlias)}.${escapeColumn("descendant")}=${this.metadata.getEntityIdMap(entity)![this.metadata.primaryColumns[0].propertyName]}`)
            .printSql();
    }
    


}

