import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { ProgrammingRow } from "./ProgrammingRow";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  category!: string;

  @OneToMany(() => ProgrammingRow, (programmingRow) => programmingRow.category)
  programming_rows: ProgrammingRow[];

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
