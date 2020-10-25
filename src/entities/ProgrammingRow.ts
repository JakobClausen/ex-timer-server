import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Category } from "./Category";
import { Whiteboard } from "./Whiteboard";

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
  whiteboard_id: number;

  @Field()
  @Column()
  category_id: number;

  @Field(() => Whiteboard)
  @JoinColumn({ name: "whiteboard_id" })
  @ManyToOne(() => Whiteboard, (whiteboard) => whiteboard.programming_rows)
  whiteboard: Whiteboard;

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
