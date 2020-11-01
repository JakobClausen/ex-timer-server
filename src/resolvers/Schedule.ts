import { GymClass } from "../entities/GymClass";
import { Schedule } from "../entities/Schedule";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { BaseEntity } from "typeorm";
import { ScheduleClassInput } from "./types/ScheduleType";

@Resolver()
export class ScheduleResolver extends BaseEntity {
  // create schedule
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createSchedule(
    @Ctx() { req }: MyContext,
    @Arg("data") data: ScheduleClassInput
  ) {
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
