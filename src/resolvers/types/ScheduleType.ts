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
  classes!: ClassInput[];
}

@ObjectType()
@InputType()
export class ScheduleClassInput {
  @Field(() => ScheduleInput)
  Monday!: ScheduleInput;

  @Field(() => ScheduleInput)
  Tuseday!: ScheduleInput;

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

///////////////////////
// Subcription

@ObjectType()
@InputType()
export class ClassSub {
  @Field()
  start_time!: string;

  @Field()
  end_time!: string;

  @Field()
  category!: number;
}

@ObjectType()
@InputType()
export class ScheduleSub {
  @Field()
  day!: string;

  @Field(() => [ClassSub])
  classes!: ClassSub[];
}

@ObjectType()
@InputType()
export class ScheduleClassSub {
  @Field(() => ScheduleSub)
  Monday!: ScheduleSub;

  @Field(() => ScheduleSub)
  Tuseday!: ScheduleSub;

  @Field(() => ScheduleSub)
  Wednesday!: ScheduleSub;

  @Field(() => ScheduleSub)
  Thursday!: ScheduleSub;

  @Field(() => ScheduleSub)
  Friday!: ScheduleSub;

  @Field(() => ScheduleSub)
  Saturday!: ScheduleSub;

  @Field(() => ScheduleSub)
  Sunday!: ScheduleSub;
}
