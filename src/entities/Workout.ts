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
import { Whiteboard } from "./Whiteboard";

@ObjectType()
@Entity()
export class Workout extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column()
  workout!: string;

  @Field()
  @Column()
  category_id: number;

  @Field()
  @Column()
  whiteboard_id: number;

  @Field(() => Whiteboard)
  @OneToMany(() => Whiteboard, (whiteboard) => whiteboard.workout)
  @JoinColumn({ name: "whiteboard_id" })
  whiteboard: Promise<Whiteboard[]>;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.workouts)
  @JoinColumn({ name: "category_id" })
  category: Promise<Category>;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
