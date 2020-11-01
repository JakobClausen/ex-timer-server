import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Workout } from "./Workout";

@ObjectType()
@Entity()
export class Whiteboard extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  day!: string;

  @Field()
  @Column()
  user_id: number;

  @Field(() => User)
  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.whiteboards, { onDelete: "CASCADE" })
  user: User;

  @Field(() => [Workout])
  @OneToMany(() => Workout, (workout) => workout.whiteboard)
  workout: Promise<Workout[]>;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
