import { InputType, Field } from "type-graphql";

@InputType()
export class RegistrationData {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  username: string;
}
