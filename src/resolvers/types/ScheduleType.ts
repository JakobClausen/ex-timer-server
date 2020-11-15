import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
@InputType()
export class ClassInput {
  @Field()
  start_time!: string;

  @Field()
  end_time!: string;

  @Field()
  category!: number;
}

@ObjectType()
@InputType()
export class ScheduleInput {
  @Field()
  day!: string;

  @Field(() => [ClassInput])
  gymClass!: ClassInput[];
}

@ObjectType()
@InputType()
export class ScheduleClassInput {
  @Field(() => ScheduleInput)
  Monday!: ScheduleInput;

  @Field(() => ScheduleInput)
  Tuesday!: ScheduleInput;

  @Field(() => ScheduleInput)
  Wednesday!: ScheduleInput;

  @Field(() => ScheduleInput)
  Thursday!: ScheduleInput;

  @Field(() => ScheduleInput)
  Friday!: ScheduleInput;

  @Field(() => ScheduleInput)
  Saturday!: ScheduleInput;

  @Field(() => ScheduleInput)
  Sunday!: ScheduleInput;
}

///////////////
// Query return
@ObjectType()
@InputType()
export class ClassResponse {
  @Field()
  start_time!: string;

  @Field()
  end_time!: string;

  @Field()
  category_id!: number;
}

@ObjectType()
export class DayResponse {
  @Field()
  day!: string;

  @Field(() => [ClassResponse])
  gymClass!: ClassResponse[];
}
