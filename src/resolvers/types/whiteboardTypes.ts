import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CategoryInput {
  @Field()
  category!: string;
}

@InputType()
export class RowField {
  @Field()
  title: string;

  @Field()
  workout: string;
}

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
