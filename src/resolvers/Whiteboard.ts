import { Whiteboard } from "../entities/Whiteboard";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Category } from "../entities/Category";
import { CategoryInput, DaysInput } from "./types/whiteboardTypes";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { Workout } from "../entities/Workout";
import { createMarkdown } from "../utils/createMarkdown";

@Resolver()
export class WhiteboardResolver {
  // create whiteboard
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createWhiteboard(
    @Arg("data") data: DaysInput,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    await Whiteboard.delete({ user_id: req.session.userId });
    const days = createMarkdown(data);

    console.log(days);

    days.map(async (day) => {
      const whiteboard = await Whiteboard.create({
        day: day.day,
        user_id: req.session.userId,
      }).save();

      const workouts = [day.one, day.two, day.three];

      workouts.map(async (workout) => {
        await Workout.create({
          title: workout.title,
          workout: workout.workout,
          category_id: day.category,
          whiteboard_id: whiteboard.id,
        }).save();
      });
    });

    return true;
  }

  @Query(() => Whiteboard)
  async getWhiteboard(
    @Ctx() { req }: MyContext,
    @Arg("day") day: string
  ): Promise<Whiteboard> {
    const response = await getConnection()
      .getRepository(Whiteboard)
      .createQueryBuilder("w")
      .innerJoinAndSelect("w.workout", "r", "r.whiteboard_id = w.id")
      .where("user_id = :id ", { id: req.session.userId })
      .andWhere("day = :day", { day })
      .getOne();

    if (!response) {
      throw new Error("asdásd");
    }

    return response;
  }

  @Query(() => [Whiteboard])
  async getAllWhiteboards(@Ctx() { req }: MyContext): Promise<Whiteboard[]> {
    const response = await getConnection()
      .getRepository(Whiteboard)
      .createQueryBuilder("w")
      .innerJoinAndSelect("w.workout", "r", "r.whiteboard_id = w.id")
      .where("user_id = :id ", { id: req.session.userId })
      .getMany();

    if (!response) {
      throw new Error("asdásd");
    }

    return response;
  }

  // create a category
  @Mutation(() => Category)
  async createCategory(@Arg("data") data: CategoryInput): Promise<Category> {
    return await Category.create({
      category: data.category,
    }).save();
  }
}
