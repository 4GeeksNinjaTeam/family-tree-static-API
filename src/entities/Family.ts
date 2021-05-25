import {Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn} from "typeorm";

@Entity()
@Tree("closure-table",{
    closureTableName: "family_tree",
    ancestorColumnName: (column) => "padre_" + column.propertyName,
    descendantColumnName: (column) => "hijo_" + column.propertyName,
})
export class Family {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @TreeChildren()
    children: Family[];

    @TreeParent()
    parent: Family;
}
