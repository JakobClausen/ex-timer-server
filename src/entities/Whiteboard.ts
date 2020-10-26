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

import { WhiteboardRowRel } from "./WhiteboardRowRel";

@ObjectType()
@Entity()
export class Whiteboard extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  date!: string;

  @Field()
  @Column()
  user_id: number;

  // @Field(() => User)
  // @JoinColumn({ name: "user_id" })
  // @ManyToOne(() => User, (user) => user.whiteboards)
  // user: User;

  @OneToMany(
    () => WhiteboardRowRel,
    (whiteboardRowRel) => whiteboardRowRel.whiteboard
  )
  programming_rows_connections: Promise<WhiteboardRowRel[]>;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
