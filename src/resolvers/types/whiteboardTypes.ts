import { InputType, Field } from "type-graphql";

@InputType()
export class CategoryInput {
  @Field()
  category!: string;
}

@InputType()
export class WhiteboardInput {
  @Field()
  date!: string;

  @Field()
  title!: string;

  @Field()
  markdown!: string;

  @Field()
  category!: number;
}
