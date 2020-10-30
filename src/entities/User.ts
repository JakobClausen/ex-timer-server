import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Whiteboard } from "./Whiteboard";
import { Schedule } from "./Schedule";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Field(() => String)
  @Column()
  username!: string;

  @Column()
  password!: string;

  @Field(() => [Whiteboard])
  @OneToMany(() => Whiteboard, (whiteboard) => whiteboard.user)
  whiteboards: Whiteboard[];

  @Field(() => [Schedule])
  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedule: Schedule[];

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
