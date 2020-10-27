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

@Resolver()
export class WhiteboardResolver {
  // create whiteboard
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createWhiteboard(
    @Arg("data") data: DaysInput,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    //Create new Whiteboard
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
      const whiteboard = await Whiteboard.create({
        date: day.day,
        user_id: req.session.userId,
      }).save();

      const workouts = [day.one, day.two, day.three];

      workouts.map(async (workout) => {
        await Workout.create({
          ...workout,
          category_id: day.category,
          whiteboard_id: whiteboard.id,
        }).save();
      });
    });

    return true;
  }

  @Query(() => [Whiteboard])
  async getWhiteboard(@Ctx() { req }: MyContext): Promise<Whiteboard[]> {
    const response = await getConnection()
      .getRepository(Whiteboard)
      .createQueryBuilder("w")
      .innerJoinAndSelect("w.workout", "r", "r.whiteboard_id = w.id")
      .where({ user_id: req.session.userId })
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
