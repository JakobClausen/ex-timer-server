import { GymClass } from "../entities/GymClass";
import { Schedule } from "../entities/Schedule";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { BaseEntity } from "typeorm";
import { ScheduleClassInput, ScheduleClassSub } from "./types/ScheduleType";

@Resolver()
export class ScheduleResolver extends BaseEntity {
  @Subscription(() => ScheduleClassSub, {
    topics: "SCHEDULE",
  })
  async subSchedule(
    @Root() data: ScheduleClassInput
  ): Promise<ScheduleClassSub> {
    return data;
  }

  // create schedule
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createSchedule(
    @Ctx() { req }: MyContext,
    @Arg("data") data: ScheduleClassInput,
    @PubSub("SCHEDULE") publish: Publisher<ScheduleClassInput>
  ) {
    await publish(data);

    await Schedule.delete({ user_id: req.session.userId });

    const days = [
      data.Monday,
      data.Tuseday,
      data.Wednesday,
      data.Thursday,
      data.Friday,
      data.Saturday,
      data.Sunday,
    ];

    days.map(async (day) => {
      const schedule = await Schedule.create({
        day: day.day,
        user_id: req.session.userId,
      }).save();

      day.classes.map(async (gymClass) => {
        await GymClass.create({
          start_time: gymClass.start_time,
          end_time: gymClass.end_time,
          category_id: gymClass.category,
          schedule_id: schedule.id,
        }).save();
      });
    });

    return true;
  }
}
