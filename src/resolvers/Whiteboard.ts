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
import {
  WhiteboardInput,
  CategoryInput,
  RowField,
} from "./types/whiteboardTypes";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { ProgrammingRow } from "../entities/ProgrammingRow";
import { WhiteboardRowRel } from "../entities/WhiteboardRowRel";

@Resolver()
export class WhiteboardResolver {
  // create whiteboard
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createWhiteboard(
    @Arg("data") data: WhiteboardInput,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    // const delWhiteboard = await getConnection()
    //   .createQueryBuilder()
    //   .delete()
    //   .from(Whiteboard)
    //   .where("user_id = :id", { id: req.session.userId })
    //   .returning("*")
    //   .execute();

    //Create new Whiteboard
    const whiteboard = await Whiteboard.create({
      date: data.day,
      user_id: req.session.userId,
    }).save();

    const workouts = [data.one, data.two, data.three];
    const workoutIds: any = [];

    workouts.map(async (row: RowField) => {
      let newRow = await ProgrammingRow.create({
        title: row.title,
        markdown: row.workout,
        category_id: data.category,
      }).save();
      workoutIds.push(newRow.id);
    });

    workoutIds.map(async (workoutId: any) => {
      await WhiteboardRowRel.create({
        whiteboard_id: whiteboard.id,
        programming_row_id: workoutId,
      }).save();
    });

    return true;
  }

  @Query(() => [Whiteboard])
  async getWhiteboard(@Ctx() { req }: MyContext): Promise<Whiteboard[]> {
    const response = await getConnection()
      .getRepository(Whiteboard)
      .createQueryBuilder("w")
      .innerJoinAndSelect("w.programming_rows", "r", "r.whiteboard_id = w.id")
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
