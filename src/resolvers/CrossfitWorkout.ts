import { Query, Resolver } from "type-graphql";

@Resolver()
export class CrossfitWorkout {
  @Query(() => String)
  async getRandomWorkout(): Promise<string> {
    return "Random Workout";
  }
}
