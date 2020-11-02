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
  tuesday!: WhiteboardInput;

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
