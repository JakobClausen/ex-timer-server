import { InputType, Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@InputType()
export class CategoryInput {
  @Field()
  category!: string;
}

@ObjectType()
@InputType()
export class RowField {
  @Field()
  title: string;

  @Field()
  workout: string;
}

@ObjectType()
@InputType()
export class WhiteboardInput {
  @Field()
  day!: string;

  @Field(() => Int)
  category!: number;

  @Field(() => RowField)
  one!: RowField;

  @Field(() => RowField)
  two!: RowField;

  @Field(() => RowField)
  three!: RowField;
}

@ObjectType()
@InputType()
export class DaysInput {
  @Field(() => WhiteboardInput)
  Monday!: WhiteboardInput;

  @Field(() => WhiteboardInput)
  Tuseday!: WhiteboardInput;

  @Field(() => WhiteboardInput)
  Wednesday!: WhiteboardInput;

  @Field(() => WhiteboardInput)
  Thursday!: WhiteboardInput;

  @Field(() => WhiteboardInput)
  Friday!: WhiteboardInput;

  @Field(() => WhiteboardInput)
  Saturday!: WhiteboardInput;

  @Field(() => WhiteboardInput)
  Sunday!: WhiteboardInput;
}

///////////////////////
// Subscription types

@ObjectType()
@InputType()
export class Three {
  @Field()
  title: string;

  @Field()
  workout: string;
}

@ObjectType()
@InputType()
export class Two {
  @Field()
  day!: string;

  @Field(() => Int)
  category!: number;

  @Field(() => Three)
  one!: Three;

  @Field(() => Three)
  two!: Three;

  @Field(() => Three)
  three!: Three;
}

@ObjectType()
@InputType()
export class SubscriptionData {
  @Field(() => Two)
  Monday!: Two;

  @Field(() => Two)
  Tuseday!: Two;

  @Field(() => Two)
  Wednesday!: Two;

  @Field(() => Two)
  Thursday!: Two;

  @Field(() => Two)
  Friday!: Two;

  @Field(() => Two)
  Saturday!: Two;

  @Field(() => Two)
  Sunday!: Two;
}
