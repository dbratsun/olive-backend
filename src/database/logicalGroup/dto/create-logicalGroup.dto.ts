import { LogicalGroup } from "../logicalGroup.entity";

export class CreateLogicalGroupDto {
    readonly name: string;
    readonly parent: number;     
}

