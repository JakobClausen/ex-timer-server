import { Whiteboard } from "../entities/Whiteboard";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { Category } from "../entities/Category";
import {
  CategoryInput,
  DaysInput,
  SubscriptionData,
} from "./types/whiteboardTypes";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { Workout } from "../entities/Workout";

@Resolver()
export class WhiteboardResolver {
  @Subscription(() => SubscriptionData, {
    topics: "SUBWHITEBOARD",
  })
  async subWhiteboard(@Root() data: DaysInput): Promise<SubscriptionData> {
    return data;
  }

  // create whiteboard
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createWhiteboard(
    @Arg("data") data: DaysInput,
    @Ctx() { req }: MyContext,
    @PubSub("SUBWHITEBOARD") publish: Publisher<DaysInput>
  ): Promise<Boolean> {
    await publish(data);
    await Whiteboard.delete({ user_id: req.session.userId });
    // create new whiteboards
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
