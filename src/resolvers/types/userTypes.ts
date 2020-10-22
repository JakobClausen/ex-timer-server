import { User } from "../../entities/User";
import { InputType, Field, ObjectType } from "type-graphql";

@InputType()
export class RegistrationData {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  username: string;
}

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

@InputType()
export class LoginData {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
