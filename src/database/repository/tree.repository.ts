import { TreeRepository, RemoveOptions, DeleteQueryBuilder, EntityRepository } from "typeorm";
import { LogicalGroup } from "../logicalGroup/logicalGroup.entity";

// for delete/move logic
// s. https://github.com/typeorm/typeorm/issues/193 Remove entity from TreeRepository (Closure table)

@EntityRepository(LogicalGroup)
export class TreeRepositoryExt extends TreeRepository<LogicalGroup> {

    /*
    removeById(id: any, options?: RemoveOptions): Promise<void> {

    }
    */

    /*
    createDeleteAncestorsQueryBuilder(alias: string, closureTableAlias: string, entity: LogicalGroup): DeleteQueryBuilder<LogicalGroup> {
        const escapeAlias = (alias: string) => this.manager.connection.driver.escape(alias);
        const escapeColumn = (column: string) => this.manager.connection.driver.escape(column);
        console.log(escapeAlias(closureTableAlias), " ", escapeColumn("descendant"));
        return this.createQueryBuilder(alias)
            .delete()
            .where(`${escapeAlias(closureTableAlias)}.${escapeColumn("descendant")}=${this.metadata.getEntityIdMap(entity)![this.metadata.primaryColumns[0].propertyName]}`)
            .execute();
    }
    */

    async removeAncestors(entity: LogicalGroup): Promise<void> {
        const escapeAlias = (alias: string) => this.manager.connection.driver.escape(alias);
        const escapeColumn = (column: string) => this.manager.connection.driver.escape(column);
        console.log(entity);
        console.log(`${escapeAlias("treeEntity")}`);
        console.log(`${this.metadata.getEntityIdMap(entity)![this.metadata.primaryColumns[0].propertyName]}`);
        await this
            .createQueryBuilder()
            .delete()
            .from(`${escapeAlias("treeClosure")}`)
            .where(`${escapeAlias("treeClosure")}.${escapeColumn("descendant")}=${this.metadata.getEntityIdMap(entity)![this.metadata.primaryColumns[0].propertyName]}`)
            .execute();

        // return this.createDeleteAncestorsQueryBuilder("treeEntity", "treeClosure", entity);
    }

    removeDescendants() {

    }
}