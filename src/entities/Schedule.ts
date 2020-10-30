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
import { GymClass } from "./GymClass";

@ObjectType()
@Entity()
export class Schedule extends BaseEntity {
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
  @ManyToOne(() => User, (user) => user.schedule, { onDelete: "CASCADE" })
  user: User;

  @Field(() => [GymClass])
  @OneToMany(() => GymClass, (gymClass) => gymClass.schedule)
  gymClass: GymClass[];

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
