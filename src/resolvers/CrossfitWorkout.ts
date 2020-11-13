import { getWODAPI } from "../utils/getWODAPI";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class CrossfitWorkout {
  @Query(() => String)
  async getRandomWorkout(): Promise<string> {
    const response = await getWODAPI();
    if (!response) {
      return "Something went wrong";
    }

    return response;
  }
}
