import { GymClass } from "../entities/GymClass";
import { Schedule } from "../entities/Schedule";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { BaseEntity, getConnection } from "typeorm";
import { DayResponse, ScheduleClassInput } from "./types/ScheduleType";

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
      data.Tuesday,
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

      day.gymClass.map(async (gymClass) => {
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

  @Query(() => [DayResponse])
  async getDaySchedule(
    @Arg("day") day: string,
    @Ctx() { req }: MyContext
  ): Promise<DayResponse[]> {
    const response = await getConnection()
      .getRepository(Schedule)
      .createQueryBuilder("s")
      .innerJoinAndSelect("s.gymClass", "w", "w.schedule_id = s.id")
      .where("user_id = :id ", { id: req.session.userId })
      .andWhere("day = :day", { day })
      .orderBy({ "w.start_time": "ASC" })
      .getMany();

    if (!response) {
      throw new Error("Something went wrong");
    }
    return response;
  }
  @Query(() => [DayResponse])
  async getAllSchedule(@Ctx() { req }: MyContext): Promise<DayResponse[]> {
    const response = await getConnection()
      .getRepository(Schedule)
      .createQueryBuilder("s")
      .innerJoinAndSelect("s.gymClass", "w", "w.schedule_id = s.id")
      .where("user_id = :id ", { id: req.session.userId })
      .orderBy({ "w.start_time": "ASC" })
      .getMany();

    if (!response) {
      throw new Error("Something went wrong");
    }
    return response;
  }
}
