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
import { Schedule } from "./Schedule";

@ObjectType()
@Entity()
export class GymClass extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  start_time!: string;

  @Field(() => String)
  @Column()
  end_time!: string;

  @Field()
  @Column()
  category_id: number;

  @Field()
  @Column()
  schedule_id: number;

  @Field(() => Schedule)
  @ManyToOne(() => Schedule, (schedule) => schedule.gymClass, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "schedule_id" })
  schedule: Schedule;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.workouts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "category_id" })
  category: Promise<Category>;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
