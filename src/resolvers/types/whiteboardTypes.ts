import { Whiteboard } from "../../entities/Whiteboard";
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

  @Field()
  order: number;
}

@ObjectType()
@InputType()
export class WhiteboardInput {
  @Field()
  day!: string;

  @Field(() => Int)
  category!: number;

  @Field(() => Int)
  order!: number;

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
  Tuesday!: WhiteboardInput;

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

@ObjectType()
export class AllWhiteboardsResponse {
  @Field(() => Whiteboard)
  Monday!: Whiteboard;

  @Field(() => Whiteboard)
  Tuesday!: Whiteboard;

  @Field(() => Whiteboard)
  Wednesday!: Whiteboard;

  @Field(() => Whiteboard)
  Thursday!: Whiteboard;

  @Field(() => Whiteboard)
  Friday!: Whiteboard;

  @Field(() => Whiteboard)
  Saturday!: Whiteboard;

  @Field(() => Whiteboard)
  Sunday!: Whiteboard;
}
