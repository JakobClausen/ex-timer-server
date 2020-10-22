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
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { ProgrammingRow } from "./ProgrammingRow";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

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

  @Field(() => User)
  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.whiteboards)
  user: User;

  @Field(() => [ProgrammingRow])
  @OneToMany(
    () => ProgrammingRow,
    (programmingRow) => programmingRow.whiteboard
  )
  programming_rows: ProgrammingRow[];

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
