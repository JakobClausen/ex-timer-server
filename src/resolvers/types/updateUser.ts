import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUser {
  @Field()
  id: number;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  username: string;
}
