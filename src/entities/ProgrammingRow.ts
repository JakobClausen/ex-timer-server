import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Category } from "./Category";
import { WhiteboardRowRel } from "./WhiteboardRowRel";

@ObjectType()
@Entity()
export class ProgrammingRow extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column()
  markdown!: string;

  @Field()
  @Column()
  category_id: number;

  @OneToMany(
    () => WhiteboardRowRel,
    (whiteboardRowRel) => whiteboardRowRel.programming_row
  )
  whiteboard_connection: Promise<WhiteboardRowRel[]>;

  @Field(() => Category)
  @JoinColumn({ name: "category_id" })
  @ManyToOne(() => Category, (category) => category.programming_rows)
  category: Category;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
