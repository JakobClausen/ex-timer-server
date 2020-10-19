import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUser {
  @Field()
  id: number;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  username?: string;
}
